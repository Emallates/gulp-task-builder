//https://www.npmjs.com/package/gulp-replace
// params Object|Array(Objects)
// Object => {target:<searchString>, src:<replacement>, options:{skipBinary:true|false}}
//  searchString (string)
//  replacement (String|Function)
//  options (Object) has only one properity skipBinary
var replace = require('gulp-replace');

var isArray = require('lodash/isArray');
var forEach = require('lodash/forEach');
var isObject = require('lodash/isObject');

// https://www.npmjs.com/package/gulp-html-replace 
// params = opts.options(required) only for html
// opts.options(Object){buildName:replacement}
// buildName (string|RegExp)
// replacement (String|Array|Object)
var htmlReplace = require('gulp-html-replace'); 

module.exports = function replaceRunner(stream, opts, task) {
	
	if(isArray(opts)){
		forEach(opts, doReplace);
		return stream;
	}else{ doReplace(opts); return stream;}

	function doReplace(opt){
		if( !isObject(opt) ){console.log('replace skip of task'+name); return;}
		if(opt.target && opt.src ){ stream = stream.pipe(replace(opt.target, opt.src, opt.options));}
		if(opt.options && isObject(opt.options) && task.ext =='.html') stream = stream.pipe(htmlReplace(opt.options));
	}
}