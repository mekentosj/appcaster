var App = require('./../../models').App;
var Channel = require('./../../models').Channel;
var errors = require('./../../errors');

module.exports = {
  index: function(req, res, next) {
    Channel.findAll(function(err, channels) {
      if (err) return next(err);
      res.render('admin/channels/index', { flash: req.flash(), channels: channels });
    });
  },

  new: function(req, res, next) {
    res.render('admin/channels/new', { flash: req.flash(), channel: {} });
  },

  create: function(req, res, next) {
    Channel.create(req.body.channel, function(err, channel) {
      if (err) {
        res.flash.error(err);
        res.render('admin/channels/new', { flash: req.flash(), channel: req.body.channel });
      } else {
        res.flash.success('Channel saved');
        res.redirect('/admin/channels/' + channel.id);
      }
    });
  },

  delete: function(req, res, next) {
    Channel.delete(req.param('id'), function(err) {
      if (err) return next(err);
      res.flash.success('Channel deleted');
      res.redirect('/admin/channels');
    });
  },

  patch: function(req, res, next) {
    var fields = req.body.channel;
    fields.id = req.param('id');

    Channel.update(fields, function(err, channel) {
      if (err) {
        res.flash.error(err);
        res.render('admin/channels/edit', { flash: req.flash(), channel: fields });
      } else {
        res.flash.success('Channel saved');
        res.render('admin/channels/edit', { flash: req.flash(), channel: channel });
      }
    });
  },

  show: function(req, res, next) {
    Channel.find(req.param('id'), function(err, channel) {
      if (err) return next(err);
      if (!channel) return next(new errors.NotFound('Channel not found'));
      res.render('admin/channels/edit', { flash: req.flash(), channel: channel });
    });
  }
};
