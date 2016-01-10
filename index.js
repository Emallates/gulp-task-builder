var gulp = require('gulp'),
	async = require('async'),
  plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'run-sequence'],
	replaceString: /\bgulp[\-.]/
});




var builder = function(){};

/* Utils Start */
builder.prototype.runTask = function(tasks, callback){
	callback = callback || function(){};
	plugins.runSequence(tasks, callback);
};
builder.prototype._isObject = function(obj){ return (typeof obj === 'object' && obj !== null );};
builder.prototype.isArray = Array.isArray || function(arr){ return (arr instanceof Array && arr.constructor.toString().indexOf("Array") > -1); };
/* Utils End */

builder.prototype.initTask = function(name, taskObj){
	var _self = this;
	/* Validate and sone other options like taskObj.preRun */
	if(taskObj.preRun){
		taskObj.preRun = _self.isArray(taskObj.preRun) ? taskObj.preRun : [taskObj.preRun];
		_self.runTask(taskObj.preRun, function(){
			gulp.task(name, _self.buildTask(taskObj));
		});
	}
	else gulp.task(name, _self.buildTask(taskObj));
	if(taskObj.watch) gulp.watch(taskObj.src, [name]);

};

builder.prototype.buildTask = function(task){ 
	var _self = this;
	return function(){
		var gulpTask = gulp.src(task.src);
		if(task.preLog) gulpTask = gulpTask.pipe(plugins.intercept(function(file){ console.log(file[task.preLog || 'contents'].toString()); return file; }));
		if(task.debug) gulpTask = gulpTask.pipe(plugins.plumber());
		if(task.concat && _self._isObject(task.concat)){
			var fileName = (task.concat.name||name);
			fileName += (task.concat.ext && task.concat.ext.toString().indexOf('.') != -1)? task.concat.ext : task.ext;
			gulpTask = gulpTask.pipe(plugins.concat(fileName));
		}
		if(task.compress){
			switch(task.ext){
				case '.js': gulpTask = gulpTask.pipe(plugins.uglify()); break;
				case '.html': gulpTask = gulpTask.pipe(plugins.minifyHtml({conditionals: true,spare:true})); break;
				case '.css': gulpTask = gulpTask.pipe(plugins.minifyCss({compatibility: 'ie8'})); break;
			}
		}
		if(task.replace){
			if(Array.isArray(task.replace)){
				for(var i in task.replace){
					var repCrit = task.replace[i];
					if(repCrit.target && repCrit.src ) gulpTask = gulpTask.pipe(plugins.replace(repCrit.target, repCrit.src));
					if(repCrit.options && _self._isObject(repCrit.options) && task.ext =='.html') gulpTask = gulpTask.pipe(plugins.htmlReplace(repCrit.options));
				}
			}else if(_self._isObject(task.replace)){
				if(task.replace.target && task.replace.src ) gulpTask = gulpTask.pipe(plugins.replace(task.replace.target, task.replace.src));
				if(task.replace.options && _self._isObject(task.replace.options) && task.ext =='.html') gulpTask = gulpTask.pipe(plugins.htmlReplace(task.replace.options));
			}else console.log('replace skip of task'+name);
		}
		if(task.rename){ 
			if(_self._isObject(task.rename) || typeof(task.rename) === 'function') gulpTask = gulpTask.pipe(plugins.rename(task.rename));
			else console.log('rename skip of task '+name); 
		}

		if(task.wrapper && _self._isObject(task.wrapper) ){
			var obj = {};
			if(task.wrapper.header) obj.header = task.wrapper.header
			if(task.wrapper.footer) obj.footer = task.wrapper.footer
			gulpTask = gulpTask.pipe( plugins.wrapper(obj) );
		}
		if(task.save) gulpTask = gulpTask.pipe( gulp.dest(task.dest) );
		console.log(task.name, ' job done');
	}
};
module.exports = builder;

