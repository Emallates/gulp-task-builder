var builder = require('../index');
var builderObj = new builder(); 
var taskTMPL = {
	'TaskName':{
		name:'TaskName'
		, preLog:'contents'// {string} GET => contents|path
		, watch:false//{bool}  false|true / 0|1
		, debug:false //{bool}  false|true / 0|1
		, src:['packages/**/**/*.js']//{string|array}

		//NOTE:- name MUST be with extension 
		, concat:"bundle.js"// {string|object} e.g 'bundle.js'|{name:'bundle', ext:'.js'}  
		, compress:false  //{bool}  false|true / 0|1
		, replace:false// {}
		// , dest:''
		// , rename:{ dirname: "main/text/ciao", basename: "aloha", prefix: "bonjour-", suffix: "-hola", extname: ".md" }

	}
};
builderObj.initTask('TaskName', taskTMPL.TaskName); 
builderObj.runTask(taskTMPL.TaskName.name);