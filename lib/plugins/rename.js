var rename = require('gulp-rename');
var isObject = require('lodash/isObject');
var isFunction = require('lodash/isFunction');
var isString = require('lodash/isString');

module.exports = function renameRunner(stream, opts, task){
	if(isObject(opts) || isFunction(opts) || isString(opts)) return stream.pipe(rename(opts));
	else{ console.log('rename skip of task '+task.name); return stream;}
}