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
      next();
    } else {
      next(new errors.AuthError('Not authorized for this service'));
    }
  },

  requiresUser: function(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
      Middleware.checkUser(req, res, next);
    } else {
      next(new errors.AuthError('Not signed in'));
    }
  }
};
