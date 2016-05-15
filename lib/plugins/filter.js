var filter = require('gulp-filter');
var isObject = require('lodash/isObject');
module.exports = function filterRunner(stream, opts) {
	// TODO:- restore and passthrough
	var match = isObject(opts) && opts.match || opts;
	var options = isObject(opts) && opts.options || null;
	return stream.pipe(filter(match, options));

}