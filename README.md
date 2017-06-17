# Gulp Task Builder

Node module task builder which can be configured by a JSON Object containing the relevant tasks to build.

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url]  [![Docs][docs-svg]][docs-url] [![License][license-image]][license-url]  [![Downloads][downloads-image]][downloads-url]

#### DESCRIPTION

Node module task builder which can be configured by a JSON Object containing the relevant tasks to build. Now you dont need to write gulp tasks in javascript just feine object then thats it.

<!--NO_HTML-->

Table of Contents
-----------------
**Getting Started**

1. [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  
. [Features](#features)
  - [Compress](#compress)
  - [Concatenate](#concatenate)
  - [Replace](#replace)
  - [Rename](#rename)
  - [Wrapper](#wrapper)
  - [Harmony](#harmony)

. [TODO](#todo)

<!--/NO_HTML-->

Setup
============

### Install

```npm install gulp-task-builder -D ```

### Usage
```js
var builder = require('gulp-task-builder')
var tasks = {
  "task1":{src:"path/to/source/files", dest:"path/to/save"}
}
builder.loadTasks(tasks);
builder.runTasks();
```
**[Task Options](#task-options)**

Examples
-------------

#### Basic Example 

with **required** options
```js
var builder = require('gulp-task-builder')
var tasks = {
  "task1":{src:"./src/*.js", ext:".js", dest:"dest"},
  "task2":{src:"./packages/*.js", ext:".js", dest:"dest/lib"}
}
builder.loadTasks(tasks);
builder.runTasks();
```

#### Compress

Compress your files with the `compress` option. This function is using 

- [gulp-uglify][gulp-uglify] for javascript
- [gulp-htmlmin][gulp-htmlmin] for html
- [gulp-clean-css][gulp-clean-css] for css
- [gulp-jsonminify][gulp-jsonminify] for json

```js
{src:"./src/*.js", ext:".js", dest:"dest", compress:true}
{src:"./src/*.html", ext:".html", dest:"dest", compress:{collapseWhitespace: true}}
{src:"./src/*.css", ext:".css", dest:"dest", compress:{compatibility: 'ie8'}}
{src:"./src/*.json", ext:".json", dest:"dest", compress:true}
```
    
for more `css` options [Click Here][gulp-mincss-opts]

#### Concatenate

Concatenate (join) your files with the `concat` option. 
```js
//File name will be task1.js which is the task name
task1:{src:"./src/*.js", ext:".js", dest:"dest", concat:true}

//File name will be jsbundle.js which is the task name
task1:{src:"./src/*.js", ext:".js", dest:"dest", concat:true, name:"jsbundle"}

//JSON
//File name will be jsbundle.json which is the task name
task1:{src:"./src/*.json", ext:".json", dest:"dest", concat:true, name:"jsonbundle"}
```

#### Filter

Filter your source files with the `filter` option.
```js
{src:"./src/*.js", ext:".js", dest:"dest", filter:'!src/vendor'}
{src:"./src/*.js", ext:".js", dest:"dest", filter:['*', '!src/vendor']}
{src:"./src/*.js", ext:".js", dest:"dest", filter:{match:['*', '!src/vendor'], options:{restore:true, passthrough:true, dot:true}}}
{src:"./src/*.js", ext:".js", dest:"dest", filter:function(file){ /*You can access file.cwd, file.base, file.path and file.contents */ }}
```
restore and passthrough will come very soon.

#### Rename

Rename your destination file or path. You can provide **String|Function|Object**.
```js
{src:"./src/*.js", ext:".js", dest:"dest", rename:"main/text/ciao/goodbye.md"}
{src:"./src/*.js", ext:".js", dest:"dest", rename:function (path) { path.dirname += "/ciao"; path.basename += "-goodbye"; path.extname = ".md" }}
{src:"./src/*.js", ext:".js", dest:"dest", rename:{dirname: "main/text/ciao", basename: "aloha", prefix: "bonjour-", suffix: "-hola", extname: ".md"}}
```

#### Wrapper

Wrap your files or target files with the given headers and footers **Object|Array**.
```js 
{src:"./src/*.js", ext:".js", dest:"dest", wrapper:{header:"this will be header", footer:"this will be footer"}}
{src:"./src/*.js", ext:".js", dest:"dest", wrapper:[{header:"header1", footer:"footer1"}{header:"headerN", footer:"footerN"}]}
```

#### Log contents

You can also log paths contents and other stream options. In case set to true the default value will be `contents`
```js 
{src:"./src/*.js", ext:".js", dest:"dest", log:true}
{src:"./src/*.js", ext:".js", dest:"dest", preLog:true}
{src:"./src/*.js", ext:".js", dest:"dest", preLog:'path'}// Console Paths
```

#### Disable save

You can also disable the save option by setting `save:false`
```js    
{src:"./src/*.js", ext:".js", dest:"dest", save:false}
```
Task options
-------------
Each task contains **REQUIRED** options which can be passed along with **OPTIONALS**(Flow Control, Plugins, Log Options).

### REQUIRED
#### Required Options
- **src** (string) Gulp [src][g-src-rf] parameter. Path of your source files. It can be also regEx. [More Details][g-src-rf].
- **dest** (string) Gulp [dest][g-dest-rf] parameter. Path where you want to save your files. [More Details][g-dest-rf].
- **ext** (string) extension of file which is defined in `src` option.

### OPTIONALS
#### Flow Control
- **runBefore** (string|Array(string)) Define task dependencies which will run before this task.
- **save** (bool) Set `true` if you want to save your output. Default `true`.
- **name** (string) **Recommended**. Define unique name of gulp task.
- **order** (Array(string)) Define flow of execution. Like ['log','filter','compress','concat','wrapper'].

#### Plugins

This package is using below pluging

| Task | Plugin | Value Type | Description |
| ---- | ------ | ---------- | ----------- |
| Filter | [gulp-filter][gulp-filter] | <ul><li>Object</li> <li>String</li> <li>Array</li> <li>Function</li></ul> | To filter your files. if you are sending Object then that object should have two properties [match][g-filter-opts] and options. See [gulp-filter][g-filter-api] for more details. |
| Concat | <ul><li>[gulp-concat][gulp-concat]</li><li>[gulp-merge-json][gulp-merge-json]</li></ul> | <ul><li>String</li><li>Object</li></ul> | object contains two properties name and ext. |
| Replace | [gulp-replace][gulp-replace] | <ul><li>Object</li><li>array(objects)</li></ul> | Object can be one of these two objects `{target:"", src:""}` this will send to [gulp-replace][gulp-replace] and second `{buildName:replacement}` buildName (string|RegExp) replacement (String|Array|Object). |
| Debug | --- | Boolean | true, false | Enable [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) |
| Wrapper | [gulp-wrapper][gulp-wrapper] | <ul><li>Object</li><li>Array</li></ul> | Each Object has two options header and footer. [More Details][gulp-wrapper] |
| Harmony/ES2015 | --- | Boolean | Set it true if you need `ES6` support too. [More Details](https://www.npmjs.com/package/gulp-uglify#using-a-different-uglifyjs) | 
| Rename | [gulp-rename][gulp-rename] | <ul><li>String</li><li>Object</li><li>Function</li></ul> | You can edit the name or edit the path of your destination file. [More Details][gulp-rename] |
| Compress | <ul><li>[gulp-uglify][gulp-uglify]</li><li>[gulp-htmlmin][gulp-htmlmin]</li><li>[gulp-clean-css][gulp-clean-css]</li></ul> | <ul><li>Boolean</li><li>Object</li></ul> | this will use [gulp-uglify][gulp-uglify] if `ext` is `.js`, [gulp-htmlmin][gulp-htmlmin] if `ext` is `.html` and [gulp-clean-css][gulp-clean-css] if `css` is `.css` |




#### Log Options
- **log** (string|bool) log/console content of stream. All options of [glob-stream](https://github.com/gulpjs/glob-stream) are supported. Default value is `contents`.
- **preLog** (bool) console stream before processing. same as `log` above.
- **postLog** (bool) console stream just before save(`gulp.dest` function) stream. same as `log` above.
- **get** (function) Just in case if you want to get stream.**NOTE** it will not effect the stream.



## Todo
  - Use pums instead of pipe in tasks [Reason](https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump) and [package](https://www.npmjs.com/package/pump)

## License
**MIT**


[version-svg]: https://img.shields.io/npm/v/gulp-task-builder.svg?style=flat-square
[travis-svg]: https://img.shields.io/travis/Emallates/gulp-task-builder/master.svg?style=flat-square
[docs-svg]: http://inch-ci.org/github/Emallates/gulp-task-builder.svg?branch=master
[docs-url]: https://npmjs.org/package/gulp-task-builder/docs
[package-url]: https://npmjs.org/package/gulp-task-builder
[travis-url]: https://api.travis-ci.org/Emallates/gulp-task-builder.svg?branch=master
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/gulp-task-builder.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=gulp-task-builder


[g-src-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
[g-dest-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options
[g-watch-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb

[g-filter-opts]: https://www.npmjs.com/package/gulp-filter#options
[g-filter-api]: https://www.npmjs.com/package/gulp-filter#filterpattern-options
[gulp-replace]: https://www.npmjs.com/package/gulp-replace

[gulp-uglify]: https://www.npmjs.com/package/gulp-uglify
[uglify-js-harmony]: https://www.npmjs.com/package/uglify-js-harmony

[gulp-filter]: https://www.npmjs.com/package/gulp-filter
[gulp-concat]: https://www.npmjs.com/package/gulp-concat
[gulp-rename]: https://www.npmjs.com/package/gulp-rename
[gulp-wrapper]: https://www.npmjs.com/package/gulp-wrapper
[gulp-htmlmin]: https://www.npmjs.com/package/gulp-htmlmin
[gulp-clean-css]: https://www.npmjs.com/package/gulp-clean-css
[gulp-jsonminify]: https://www.npmjs.com/package/gulp-jsonminify
[gulp-merge-json]: https://www.npmjs.com/package/gulp-merge-json
[gulp-mincss-opts]: https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
