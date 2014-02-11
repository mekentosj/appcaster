module.exports = {
  index: function(req, res, next) {
    res.render('admin/apps/index', { flash: req.flash() });
  },

  patch: function(req, res, next) {
  },

  show: function(req, res, next) {
  }
};
