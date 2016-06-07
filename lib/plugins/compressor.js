var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
var imagemin = require('gulp-imagemin')
var cleanCss = require('gulp-clean-css')

var isObject = require('lodash/isObject');

module.exports = function compressor(stream, opts, task) {
	var options = (isObject(opts)) ? opts : null;
	switch(task.ext){
		case '.js': return stream.pipe(uglify());
		case '.html': return stream.pipe(htmlmin(options/*{collapseWhitespace: true}*/));
		case '.css': return stream.pipe(cleanCss(options/*{compatibility: 'ie8'}*/));
		case '.img': return stream.pipe(imagemin(options/*{compatibility: 'ie8'}*/));
	}
}