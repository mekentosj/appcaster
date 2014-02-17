var App = require('./../../models').App;
var Build = require('./../../models').Build;
var Channel = require('./../../models').Channel;
var errors = require('./../../errors');
var Release = require('./../../models').Release;

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

  release: function(req, res, next) {
    Build.find(req.param('id'), function(err, build) {
      if (err) return next(err);
      if (!build) return next(new errors.NotFound('Build not found'));

      Channel.findAllForApp(build.app_id, function(err, channels) {
        Release.findAllForBuildId(build.id, function(err, releases) {
          if (err) return next(err);
          res.render('admin/builds/release', {
            flash: req.flash(),
            build: build,
            channels: channels,
            releases: releases
          });
        });
      });
    });
  },

  show: function(req, res, next) {
    Build.find(req.param('id'), function(err, build) {
      if (err) return next(err);

      Channel.findAllForApp(build.app_id, function(err, channels) {

        res.render('admin/builds/show', {
          build: build,
          channels: channels,
          flash: req.flash()
        });
      });
    });
  },

  edit: function(req, res, next) {
    Build.find(req.param('id'), function(err, build) {
      if (err) return next(err);
      res.render('admin/builds/edit', { flash: req.flash(), build: build });
    });
  },

  releases: function(req, res, next) {
    var channelIds = req.body.releases  && req.body.releases.channel_ids
      ? req.body.releases.channel_ids : [];

    Build.updateReleasesForBuildId(req.param('id'), channelIds, function(err, build) {
      if (err) return next(err);
      res.flash.success('Channels updated');
      res.redirect('/admin/builds/' + build.id + '/release');
    });
  }
};
