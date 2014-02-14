var errors = require('./errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var config = require('./config');
var routes = require('./routes');
var middleware = require('./middleware');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var db = require('./db');

app.configure('development', 'production', 'staging', function() {
  app.use(express.logger());
});

app.locals = require('./helpers');

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'Gorm Quarterly' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(middleware.flash);

app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');

function userFromGitHub(profile) {
  return {
    name: profile.displayName,
    username: profile.username
  };
}

passport.use(new GitHubStrategy({
  clientID: config.github.client_id,
  clientSecret: config.github.secret,
  callbackURL: config.github.callback
}, function(accessToken, refreshToken, profile, done) {
  if (config.users.github.indexOf(profile.username) !== -1) {
    done(null, userFromGitHub(profile));
  } else {
    done(new errors.AuthError('User not authorized'));
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/github', passport.authenticate('github'));

function authSuccess(req, res) {
  res.redirect('/admin/apps');
}

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/admin/session/error'
  }),
  authSuccess
);

app.post('/apps/:url_slug/builds', middleware.apiAuth(), routes.builds.create);
app.get('/apps/:url_slug/:channel_url_slug/appcast.xml', routes.apps.show);

app.get('/apps/:url_slug/download/:version', routes.apps.download);
app.get('/apps/:url_slug/release-notes/:version', routes.apps.releaseNotes);

app.all('/admin/*', middleware.requiresUser, middleware.navigation);
app.get('/admin', middleware.redirectIfSignedIn, routes.admin.index);
app.post('/admin/session', routes.admin.session.create);
app.get('/admin/session/error', routes.admin.session.error);

app.get('/admin/apps', routes.admin.apps.index);
app.post('/admin/apps', routes.admin.apps.create);
app.get('/admin/apps/new', routes.admin.apps.new);
app.get('/admin/apps/:id', routes.admin.apps.show);
app.patch('/admin/apps/:id', routes.admin.apps.patch);

app.get('/admin/channels', routes.admin.channels.index);
app.post('/admin/channels', middleware.loadAllApps, routes.admin.channels.create);
app.get('/admin/channels/new', middleware.loadAllApps, routes.admin.channels.new);
app.get('/admin/channels/:id', middleware.loadAllApps, routes.admin.channels.show);
app.patch('/admin/channels/:id', middleware.loadAllApps, routes.admin.channels.patch);

app.get('/admin/builds', routes.admin.builds.index);
app.post('/admin/builds', middleware.loadAllApps, routes.admin.builds.create);
app.get('/admin/builds/new', middleware.loadAllApps, routes.admin.builds.new);
app.get('/admin/builds/:id', middleware.loadAllApps, routes.admin.builds.show);
app.patch('/admin/builds/:id', middleware.loadAllApps, routes.admin.builds.patch);

app.use(function(err, req, res, next) {
  if (!err.statusCode) {
    console.error(err);
    console.error(err.stack);
  }
  res.send(err.statusCode || 500);
});

module.exports = app;
