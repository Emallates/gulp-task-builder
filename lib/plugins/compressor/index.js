var uglify = require('gulp-uglify')
	, uglifyes = require('gulp-uglifyes')
	, htmlmin = require('gulp-htmlmin')
	, cleanCss = require('gulp-clean-css')
	, jsonMin = require('gulp-jsonminify')
	, isObject = require('lodash/isObject')
;

module.exports = function compressor(stream, opts, task) {
	var options = (isObject(opts)) ? opts : null;
	switch(task.ext){
		case '.js':
			return task.harmony ? stream.pipe(uglifyes(options)) : stream.pipe(uglify(options));
		case '.html': return stream.pipe(htmlmin(options/*{collapseWhitespace: true}*/));
		case '.css': return stream.pipe(cleanCss(options/*{compatibility: 'ie8'}*/));
		case '.json': return stream.pipe(jsonMin(options));
		default: return stream;
	}
}