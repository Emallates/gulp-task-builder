// var vinyl = require('vinyl');
var builder = require('../')
builder = new builder();
var test = require('tape')
var fs = require('fs')

test('Run basic test', function (t) {
  t.plan(5)
  
	builder.loadTasks({
		jsFiles:    { /*preLog:'path',*/ src:"./test/src/*.js",     ext:'.js', compress:true, /*save:true,*/ 			dest:"./test/dest/js" , concat:"bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
		jsFilesEs6: { /*preLog:'path',*/ src:"./test/src/es6/*.js", ext:'.js', harmony:true, compress:true, dest:"./test/dest/js" , concat:"es6-bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
		cssFiles:   { /*preLog:'path',*/ src:"./test/src/*.css",    ext:'.css', compress:true, /*save:false,*/   dest:"./test/dest/css" , concat:"bundle.css" /* || , concat:{name:"bundle", ext:".js"}*/ },
		htmlFiles:  { /*preLog:'path',*/ src:"./test/src/*.html",   ext:'.html', compress:true, dest:"./test/dest/html" /* || , concat:{name:"bundle", ext:".js"}*/ },
		jsonFiles:  { /*preLog:'path',*/ src:"./test/src/apidocs/*.apidoc.json",   ext:'.json', /*compress:true,*/ dest:"./test/dest/json", concat:{name:"bundle", ext:".json"} }
	});
	builder.runTasks()
	setTimeout(function(){
		t.ok(fs.existsSync('./test/dest/js/bundle.js'))
		t.ok(fs.existsSync('./test/dest/css/bundle.css'))
		t.ok(fs.existsSync('./test/dest/html/index.html'))
		t.ok(fs.existsSync('./test/dest/js/es6-bundle.js'))
		t.ok(fs.existsSync('./test/dest/json/bundle.json'))
	}, 2000);
})