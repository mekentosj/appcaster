var App = require('./../../models').App;
var Build = require('./../../models').Build;

module.exports = {
  index: function(req, res, next) {
    Build.findAll(function(err, builds) {
      if (err) return next(err);
      res.render('admin/builds/index', { flash: req.flash(), builds: builds });
    });
  },

  new: function(req, res, next) {
    res.render('admin/builds/new', { flash: req.flash(), build: {} });
  },

  create: function(req, res, next) {
    Build.create(req.body.build, function(err, build) {
      if (err) {
        res.flash.error(err);
        res.render('admin/builds/new', { flash: req.flash(), build: req.body.build });
      } else {
        res.flash.success('Build saved');
        res.redirect('/admin/builds/' + build.id);
      }
    });
  },

  patch: function(req, res, next) {
    var fields = req.body.build;
    fields.id = req.param('id');

    Build.update(fields, function(err, build) {
      if (err) {
        res.flash.error(err);
        res.render('admin/builds/edit', { flash: req.flash(), build: fields });
      } else {
        res.flash.success('Build saved');
        res.render('admin/builds/edit', { flash: req.flash(), build: build });
      }
    });
  },

  show: function(req, res, next) {
    Build.find(req.param('id'), function(err, build) {
      if (err) return next(err);
      res.render('admin/builds/edit', { flash: req.flash(), build: build });
    });
  }
};
