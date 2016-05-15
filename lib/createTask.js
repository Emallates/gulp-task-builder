var _c = {};
var async = require('async');
var utils = require('./utils');

var forEach = require('lodash/forEach');
var isArray = require('lodash/isArray');
var isObject = require('lodash/isObject');
var isFunction = require('lodash/isFunction');

var DepResolver =  require('dependency-tree-resolver');

var gulp = require('gulp');
var plumber = require('gulp-plumber');

// var plugins = require("gulp-load-plugins")({ pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'run-sequence'], replaceString: /\bgulp[\-.]/ });
/*Public APIs*/

_c.loadTasks = function(tasks){
	var _s = this;
	if(!isObject(tasks)) throw new Error('Usage: buildTasks(tasks), tasks must be an object');
	if(utils.isTask(tasks)) return _c.loadTask.call(_s, tasks);//_c.loadTask([tasks]);
	else{
		async.waterfall([
		  function(done){ sortTasks(tasks, done); },
		  function(sTasks, done){ forEach(sTasks, function(obj){ _c.loadTask.call(_s, obj); }); done(); }
		], function(err){ if(err) throw new Error(err); /*console.log(Object.keys(_s.Tasks));*/ });
	}
}

_c.loadTask = function(tObj){
	var _s = this;
	if(tObj.preRun){
		tObj.preRun = (isArray(tObj.preRun)) ? tObj.preRun : [tObj.preRun];
		for(var i in tObj.preRun){
			if(!_s.Tasks[ tObj.preRun[i] ]) throw new Error('Prerun Task \''+tObj.preRun[i]+'\' is missing which defined in '+tObj.name+'\' task.');
		}
	}
	_s.Tasks[tObj.name] = gulp.task(tObj.name, tObj.preRun, buildTask(tObj));
	if(tObj.watch) gulp.watch(tObj.src, [tObj.name]);
}


/*Private Functions*/


function sortTasks(tasks, callback){
	async.waterfall([
		function(done){
			var availTasks = {};
			var tree = {};
			forEach(tasks, function(obj, key){
				obj.name = obj.name || obj.id || obj.identity || key || "unknown";
				obj.ext = (obj.ext && obj.ext.indexOf('.') != -1) ? obj.ext : ('.'+obj.ext);
				availTasks[obj.name] = obj;
				tree[obj.name] = (obj.preRun) ? ( (isArray(obj.preRun)) ? obj.preRun : [obj.preRun]) : [];
			});
			done(null, DepResolver(tree).map(function(name){ return availTasks[name]; }))
		}
	], callback);
}

var plugins = {
	filter : require('./plugins/filter')
	, rename : require('./plugins/rename')
	, concat : require('./plugins/concat')
	, replace : require('./plugins/replace')
	, wrapper : require('./plugins/wrapper')
	, log : require('./plugins/logger')
	, compress : require('./plugins/compressor')
};

function buildTask(task) {
	return function(){
		console.log('task called ', task.name);
		var gulpTask = gulp.src(task.src).on('error', console.log);
		if(task.debug) gulpTask = gulpTask.pipe(plumber());

		if(task.order && isArray(task.order)){
			forEach(task.order, function(itr){ if(plugins[itr]) { gulpTask = plugins[itr].call(this, gulpTask, task[itr], task); } })
		}
		else{
			if(task.filter) gulpTask = plugins.filter(gulpTask, task.filter, task);
			if(task.preLog || task.log) gulpTask = plugins.log(gulpTask, task.preLog, task);
			if(task.concat) gulpTask = plugins.concat(gulpTask, task.concat, task);
			if(task.rename) gulpTask = plugins.rename(gulpTask, task.rename, task);
			if(task.wrapper) gulpTask = plugins.wrapper(gulpTask, task.wrapper, task);
			if(task.replace) gulpTask = plugins.replace(gulpTask, task.replace, task);

			/*Middle of the task*/

			if(task.compress) gulpTask = plugins.compress(gulpTask, task.compress, task);
			if(task.postLog) gulpTask = plugins.log(gulpTask, task.postLog);
			if(task.get && isFunction(task.get)) gulpTask.pipe(task.get);
		}

		if(task.debug) gulpTask = gulpTask.pipe(plumber.stop());
		if(task.save != false) gulpTask = gulpTask.pipe( gulp.dest(task.dest) );			
	}
}

module.exports = _c;