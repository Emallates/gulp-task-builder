var _ = require('lodash');
var _u = {};
_u.isTask = function(t){ return( _.isObject(t) && !_.isUndefined(t.src) && !_.isUndefined(t.dest) ); }

module.exports = _u;