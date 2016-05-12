var builder = require('../')
builder = new builder();

builder.buildTasks({
	jsFiles:{ src:"./test/src/*.js", ext:'.js', compress:true, save:1, dest:"./test/dest/js" , concat:"bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
	cssFiles:{ src:"./test/src/*.css", ext:'.css', compress:true, save:1, dest:"./test/dest/css" , concat:"bundle.css" /* || , concat:{name:"bundle", ext:".js"}*/ },
	htmlFiles:{ preLog:'path', src:"./test/src/*.html", ext:'.html', compress:true, save:1, dest:"./test/dest/html" /* || , concat:{name:"bundle", ext:".js"}*/ }
});
builder.runTasks()
