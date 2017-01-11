var uglifyjs = require('uglify-js-harmony')
	, minifier = require('gulp-uglify/minifier')
	;
module.exports = function (stream, opts, task) {
	 return stream.pipe( minifier(opts, uglifyjs) )
}