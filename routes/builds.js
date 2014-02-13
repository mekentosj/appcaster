var Build = require('./../models').Build;

module.exports = {
  create: function(req, res, next) {
    Build.createWithAppUrl(req.param('url_id'), req.body, function(err, build) {
      if (err) {
        next(err);
      } else {
        res.send(build);
      }
    });
  }
};
