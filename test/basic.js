// var vinyl = require('vinyl');
var builder = require('../')
builder = new builder();
var test = require('tape')
var fs = require('fs')

test('Run basic test', function (t) {
  t.plan(3)
	builder.loadTasks({
		jsFiles:{ watch:true, src:"./test/src/*.js", ext:'.js', compress:true, /*save:true,*/ dest:"./test/dest/js" , concat:"bundle.js" /* || , concat:{name:"bundle", ext:".js"}*/ },
		cssFiles:{ src:"./test/src/*.css", ext:'.css', compress:true, save:false, dest:"./test/dest/css" , concat:"bundle.css" /* || , concat:{name:"bundle", ext:".js"}*/ },
		htmlFiles:{ preLog:'path', src:"./test/src/*.html", ext:'.html', compress:true, save:false, dest:"./test/dest/html" /* || , concat:{name:"bundle", ext:".js"}*/ }
	});
	builder.runTasks()
	setTimeout(function(){
		t.ok(fs.existsSync('./test/dest/css/bundle.css'))
		t.ok(fs.existsSync('./test/dest/js/bundle.js'))
		t.ok(fs.existsSync('./test/dest/html/index.html'))
	}, 2000);  
})




// builder.loadTasks({
// 	jsFiles:{
// 		src:"./test/src/*.js", ext:'.js'
// 		, compress:true, save:false, debug:true
// 		, wrapper:{header:"var nomi = 123;", footer:"nomi=321;"} 
// 		, dest:"./test/dest/js" , concat:"bundle.js"
// 		, replace:{target:"nomi", src:"ramzan"}
// 		// , filter:{match:["*"]/*, options:{restore:true}*/}
// 		, postLog:1
// 		// , postLog:true
// 		// , order:['concat', 'compress', 'wrapper', 'log']
// 	}
// 	,
// 	cssFiles:{ 
// 		src:"./test/src/*.css", ext:'.css',
// 		save:false, dest:"./test/dest/css" , concat:"bundle.css" /* || , concat:{name:"bundle", ext:".js"}*/ 
// 		, compress:true/* || {compatibility: 'ie8'}*/
// 	},
// 	htmlFiles:{
// 		src:"./test/src/*.html", ext:'.html', /*save:false,*/ dest:"./test/dest/html"//, postLog:true
// 		, compress:true/*|| {collapseWhitespace: true} */
// 		, replace:[
// 			{options:{nomi:['replacement1', 'replacement2']}}
// 			, {target:'replacement1', src:'replacement_nomi', options:{skipBinary:true}}
// 		]
// 		, rename:"nomi"
// 	}
// });


