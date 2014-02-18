var Client = require('./../../models').Client;
var errors = require('./../../errors');

module.exports = {
  index: function(req, res, next) {
    Client.findAll(function(err, clients) {
      if (err) return next(err);
      res.render('admin/clients/index', { flash: req.flash(), clients: clients });
    });
  },

  new: function(req, res, next) {
    res.render('admin/clients/new', { flash: req.flash(), client: {} });
  },

  create: function(req, res, next) {
    Client.register(req.body.client.name, req.body.client.password, function(err, client) {
      if (err) {
        res.flash.error(err);
        res.render('admin/clients/new', { flash: req.flash(), client: req.body.client });
      } else {
        res.flash.success('Client saved');
        res.redirect('/admin/clients/' + client.id);
      }
    });
  },

  delete: function(req, res, next) {
    Client.delete(req.param('id'), function(err) {
      if (err) return next(err);
      res.flash.success('Client deleted');
      res.redirect('/admin/clients');
    });
  },

  patch: function(req, res, next) {
    var fields = req.body.client;
    fields.id = req.param('id');

    Client.update(fields, function(err, client) {
      if (err) {
        res.flash.error(err);
        res.render('admin/clients/edit', { flash: req.flash(), client: fields });
      } else {
        res.flash.success('Client saved');
        res.render('admin/clients/edit', { flash: req.flash(), client: client });
      }
    });
  },

  show: function(req, res, next) {
    Client.find(req.param('id'), function(err, client) {
      if (err) return next(err);
      if (!client) return next(new errors.NotFound('Client not found'));
      res.render('admin/clients/edit', { flash: req.flash(), client: client });
    });
  }
};
