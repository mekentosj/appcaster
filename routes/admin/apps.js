var App = require('./../../models').App;

module.exports = {
  index: function(req, res, next) {
    App.findAll(function(err, apps) {
      if (err) return next(err);
      res.render('admin/apps/index', { flash: req.flash(), apps: apps });
    });
  },

  new: function(req, res, next) {
    res.render('admin/apps/new', { flash: req.flash(), app: {} });
  },

  create: function(req, res, next) {
    App.create(req.body.app, function(err, app) {
      if (err) {
        res.flash.error('Error saving app');
        next(err);
      } else {
        res.flash.success('App saved');
        res.redirect('/admin/apps/' + app.id);
      }
    });
  },

  patch: function(req, res, next) {
    var fields = req.body.app;
    fields.id = req.param('id');

    App.update(fields, function(err, app) {
      if (err) return next(err);
      res.flash.success('App saved');
      res.render('admin/apps/edit', { flash: req.flash(), app: app });
    });
  },

  show: function(req, res, next) {
    App.find(req.param('id'), function(err, app) {
      if (err) return next(err);
      res.render('admin/apps/edit', { flash: req.flash(), app: app });
    });
  }
};
