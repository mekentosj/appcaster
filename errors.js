var util = require('util');

function BadRequest(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.statusCode = 400;
  this.message = message;
  this.name = 'BadRequest';
}
util.inherits(BadRequest, Error);

function AuthError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.statusCode = 401;
  this.message = message;
  this.name = 'AuthError';
}
util.inherits(AuthError, Error);

module.exports = {
  AuthError: AuthError,
  BadRequest: BadRequest
};
