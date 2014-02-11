module.exports = function(req, res, next) {
  res.locals.flash = {};

  req.flash = function() {
    var flash = req.session._flash;
    req.session._flash = null;
    return flash;
  };

  if (!req.session._flash) {
    req.session._flash = {};
  }
  res.flash = {};
  res.flash.success = function(message) {
    req.session._flash.success = message;
  };
  res.flash.error = function(message) {
    req.session._flash.error = message;
  };
  next();
};
