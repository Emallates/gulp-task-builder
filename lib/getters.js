var getters = {};
getters.getTasks = function(){ return this.Tasks; }
getters.getTask = function(name){ return this.Tasks[name] || false; }
getters.getTaskList = function(name){ return Object.keys(this.Tasks); }
module.exports = getters;

