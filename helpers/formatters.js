var Order = require('./../models').Order;
var moment = require('moment');

module.exports = {
  date: function(date, format) {
    if (!date) return;
    return moment(date).format(format || 'DD-MM-YY');
  },

  dateTime: function(date) {
    if (!date) return;
    return moment(date).format('LLL');
  },

  time: function(date) {
    if (!date) return;
    return moment(date).format('HH:mm:ss');
  },

  d: function(date, format) {
    if (!date) return;
    return moment(date).format(format || 'DD/MM/YYYY');
  },

  dr: function(date, format) {
    if (!date) return;
    return moment(date).format(format || 'MMM Do YYYY');
  },

  moment: moment
};
