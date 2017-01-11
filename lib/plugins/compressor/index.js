var harmony = require('./harmony')
	, uglify = require('gulp-uglify')
	, htmlmin = require('gulp-htmlmin')
	, cleanCss = require('gulp-clean-css')
	, isObject = require('lodash/isObject')
;

module.exports = function compressor(stream, opts, task) {
	var options = (isObject(opts)) ? opts : null;
	switch(task.ext){
		case '.js':
			return task.harmony ? stream.pipe(harmony(stream, opts, task)) : stream.pipe(uglify(options));
		case '.html': return stream.pipe(htmlmin(options/*{collapseWhitespace: true}*/));
		case '.css': return stream.pipe(cleanCss(options/*{compatibility: 'ie8'}*/));
		default: return stream;
	}
}