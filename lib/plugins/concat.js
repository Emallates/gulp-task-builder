var concat = require('gulp-concat');
var merge = require('gulp-merge-json');

var isObject = require('lodash/isObject');
module.exports = function joiner(stream, opts, task) {
	var fileName = "";
	if(isObject(opts)){
		fileName = opts.name || task.name || '';
		if(opts.ext) fileName += (opts.ext.indexOf('.') != -1) ? opts.ext : ('.'+opts.ext);
		if(! ~fileName.indexOf('.') && task.ext) fileName+= task.ext;
	}else if( typeof opts === 'string'){
		fileName = opts;
		if(fileName.indexOf('.') == -1 && task.ext) fileName += task.ext;
	}
	switch((opts.ext || '').toUpperCase()) {
		case 'JSON':
		case '.JSON':
			return stream.pipe(merge(Object.assign({}, opts, { fileName: fileName })))
		case 'JS':
		case '.JS':
		default:
			return stream.pipe(concat(fileName))
	}
	return stream.pipe(concat(fileName));
}