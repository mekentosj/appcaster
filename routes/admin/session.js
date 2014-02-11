module.exports = {
  create: function(req, res, next) {
  },

  error: function(req, res, next) {
    res.flash.error('Sign in error');
    res.status(401);
    res.render('admin/index', { flash: req.flash() });
  }
};
