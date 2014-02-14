var App = require('./../models').App;
var Client = require('./../models').Client;
var express = require('express');
var errors = require('./../errors');
var config = require('./../config');
var Middleware;

module.exports = Middleware = {
  flash: require('./flash'),

  apiAuth: function() {
    return express.basicAuth(function(httpUser, httpPassword, next) {
      Client.auth(httpUser, httpPassword, function(err, user) {
        if (err) {
          next(err);
        } else if (user) {
          next(null, user);
        } else {
          next();
        }
      });
    });
  },

  redirectIfSignedIn: function(req, res, next) {
    Middleware.requiresUser(req, res, function(err) {
      if (err) {
        next();
      } else {
        res.redirect('/admin/apps');
      }
    });
  },

  checkUser: function(req, res, next) {
    if (config.users.github.indexOf(req.session.passport.user.username) !== -1) {
      res.locals.user = req.session.passport.user;
      next();
    } else {
      next(new errors.AuthError('Not authorized for this service'));
    }
  },

  loadAllApps: function(req, res, next) {
    App.findAll(function(err, apps) {
      if (err) return next(err);

      res.locals.apps = apps.map(function(app) {
        return [app.id, app.name];
      });

      next();
    });
  },

  navigation: function(req, res, next) {
    res.locals.nav = function(page) {
      return res.locals._currentPage.match(page) ? ' class="active"' : '';
    };

    res.nav = function(page) {
      res.locals._currentPage = page;
    };

    res.locals._currentPage = req.path;
    next();
  },

  requiresUser: function(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
      Middleware.checkUser(req, res, next);
    } else {
      next(new errors.AuthError('Not signed in'));
    }
  }
};
