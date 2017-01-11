// var vinyl = require('vinyl');
var builder = require('../')
builder = new builder();
var test = require('tape')
var fs = require('fs')

test('Run basic test', function (t) {
  t.plan(4)
	builder.loadTasks({
		jsFiles:{ src:"./test/src/*.js", ext:'.js', compress:true, /*save:true,*/ dest:"./test/dest/js" , concat:"bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
		jsFilesEs6:{ src:"./test/src/es6/*.js", ext:'.js', harmony:true, compress:true, /*save:true,*/ dest:"./test/dest/js" , concat:"es6-bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
		cssFiles:{ src:"./test/src/*.css", ext:'.css', compress:true, /*save:false,*/ dest:"./test/dest/css" , concat:"bundle.css" /* || , concat:{name:"bundle", ext:".js"}*/ },
		htmlFiles:{ preLog:'path', src:"./test/src/*.html", ext:'.html', compress:true, /*save:false,*/ dest:"./test/dest/html" /* || , concat:{name:"bundle", ext:".js"}*/ }
	});
	builder.runTasks()
	setTimeout(function(){
		t.ok(fs.existsSync('./test/dest/js/bundle.js'))
		t.ok(fs.existsSync('./test/dest/css/bundle.css'))
		t.ok(fs.existsSync('./test/dest/html/index.html'))
		t.ok(fs.existsSync('./test/dest/js/es6-bundle.js'))
	}, 2000);
})