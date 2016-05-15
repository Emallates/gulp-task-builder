var extend = require('extend')
	, runner = require('run-sequence')
	;


var builder = function(){
	this.Tasks = {};
};

/*Create*/
extend(builder.prototype, require('./lib/createTask'))

/*Getters*/
extend(builder.prototype, require('./lib/getters'))

/*Runners*/
builder.prototype.runTask = function(name){ if(name && this.Tasks[name]) runner(name); }
builder.prototype.runTasks = function(){ runner( Object.keys(this.Tasks) ); }

module.exports = builder;