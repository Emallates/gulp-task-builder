# Gulp Task Builder
[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url]  [![Downloads][downloads-image]][downloads-url]

[version-svg]: https://img.shields.io/npm/v/gulp-task-builder.svg?style=flat-square
[package-url]: https://npmjs.org/package/gulp-task-builder
[travis-svg]: https://img.shields.io/travis/Emallates/gulp-task-builder/master.svg?style=flat-square
[travis-url]: https://api.travis-ci.org/Emallates/gulp-task-builder.svg?branch=master
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/gulp-task-builder.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=gulp-task-builder



##DESCRIPTION
Node module task builder which can be configured by a JSON Object containing the relevant tasks to build.

<!--NO_HTML-->

Table of Contents
-----------------
**Getting Started**

1. [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  
1. [Features](#features)
  - [Compress](#compress)
  - [Concatenate](#concatenate)
  - [Replace](#replace)
  - [Rename](#rename)
  - [Wrapper](#wrapper)


<!--/NO_HTML-->

Setup
============

### Install

```sh npm install gulp-task-builder --save ```

### Usage

    var builder = require('gulp-task-builder')
    var tasks = {
      "task1":{src:"path/to/source/files", dest:"path/to/save"}
    }
    builder.loadTasks(tasks);
    builder.runTasks();

**[Task Options](#task-options)**

Examples
-------------

####Basic Example 
with **required** options

    var builder = require('gulp-task-builder')
    var tasks = {
      "task1":{src:"./src/*.js", ext:".js", dest:"dest"},
      "task2":{src:"./packages/*.js", ext:".js", dest:"dest/lib"}
    }
    builder.loadTasks(tasks);
    builder.runTasks();


####Compress
Compress your files with `compress` option. This function is using [gulp-uglify][gulp-uglify] for javascript, [gulp-htmlmin][gulp-htmlmin] for html and [gulp-clean-css][gulp-clean-css] for css files
    
    {src:"./src/*.js", ext:".js", dest:"dest", compress:true}
    {src:"./src/*.html", ext:".html", dest:"dest", compress:{collapseWhitespace: true}}
    {src:"./src/*.css", ext:".css", dest:"dest", compress:{compatibility: 'ie8'}}

for more `css` option [see][gulp-mincss-opts]

####Concatenate
Concatenate(join) your files with `concat` option. 
    
    //File name will be task1.js which is task name
    task1:{src:"./src/*.js", ext:".js", dest:"dest", concat:true}

    //File name will be jsbundle.js which is task name
    task1:{src:"./src/*.js", ext:".js", dest:"dest", concat:true, name:"jsbundle"}

####Filter
Filter your source files with `filter` option.
    
    {src:"./src/*.js", ext:".js", dest:"dest", filter:'!src/vendor'}
    {src:"./src/*.js", ext:".js", dest:"dest", filter:['*', '!src/vendor']}
    {src:"./src/*.js", ext:".js", dest:"dest", filter:{match:['*', '!src/vendor'], options:{restore:true, passthrough:true, dot:true}}}
    {src:"./src/*.js", ext:".js", dest:"dest", filter:function(file){ /*You can access file.cwd, file.base, file.path and file.contents */ }}

restore and passthrough will come very soon.

####Rename
Rename your destination file or path. You can provide **String|Function|Object**.
    
    {src:"./src/*.js", ext:".js", dest:"dest", rename:"main/text/ciao/goodbye.md"}
    {src:"./src/*.js", ext:".js", dest:"dest", rename:function (path) { path.dirname += "/ciao"; path.basename += "-goodbye"; path.extname = ".md" }}
    {src:"./src/*.js", ext:".js", dest:"dest", rename:{dirname: "main/text/ciao", basename: "aloha", prefix: "bonjour-", suffix: "-hola", extname: ".md"}}


####Wrapper
Wrap your files or target file with given headers and footers **Object|Array**.
    
    {src:"./src/*.js", ext:".js", dest:"dest", wrapper:{header:"this will be header", footer:"this will be footer"}}
    {src:"./src/*.js", ext:".js", dest:"dest", wrapper:[{header:"header1", footer:"footer1"}{header:"headerN", footer:"footerN"}]}


####Log contents
You can also log paths contents and other stream options. in case of true default value will be `contents`
    
    {src:"./src/*.js", ext:".js", dest:"dest", log:true}
    {src:"./src/*.js", ext:".js", dest:"dest", preLog:true}
    {src:"./src/*.js", ext:".js", dest:"dest", preLog:'path'}// Console Paths


####Disable save
You can also disable save option by setting `save:false`
    
    {src:"./src/*.js", ext:".js", dest:"dest", save:false}

Task options
-------------
Each task contains some required options and also some optional.

#### Required
- **src** (string) Gulp [src][g-src-rf] parameter. Path of your source files. It can be also regEx. [More Details][g-src-rf].
- **dest** (string) Gulp [dest][g-dest-rf] parameter. Path where you want to save your files. [More Details][g-dest-rf].
- **ext** (string) extension of file which is defined in `src` option.

#### Optional
- **runBefore** (string|Array(string)) Define task dependencies which will run before this task.
- **save** (bool) Set `true` if you want to save your output. Default `true`.
- **name** (string) **Recommended**. Define unique name of gulp task.
- **order** (Array(string)) Define flow of execution. Like ['log','filter','compress','concat','wrapper'].

#### Plugins
- **filter** (Object|string|array|function) To filter your files. if you are sending Object then that object should have two properties [match][g-filter-opts] and options. See [gulp-filter][g-filter-api] for more details.
- **concat** (string|object) object contains two properties name and ext. See [gulp-concat](https://www.npmjs.com/package/gulp-concat) for more details
- **replace** (object|array(objects)) Object can be one of these two objects `{target:"", src:""}` this will send to [gulp-replace][gulp-replace] and second `{buildName:replacement}` buildName (string|RegExp) replacement (String|Array|Object).
- **debug** (bool) Enable [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- **compress** (bool|object) this will use [gulp-uglify][gulp-uglify] if `ext` is `.js`, [gulp-htmlmin][gulp-htmlmin] if `ext` is `.html` and [gulp-clean-css][gulp-clean-css] if `css` is `.css`
- **wrapper** (Object|Array) Each Object has two options header and footer. More [Details](https://www.npmjs.com/package/gulp-wrapper)
- **rename** More [Details](https://www.npmjs.com/package/gulp-rename)




#### Log Options
- **log** (string|bool) log/console content of stream. All options of [glob-stream](https://github.com/gulpjs/glob-stream) are supported. Default value is `contents`.
- **preLog** (bool) console stream before processing. same as `log` above.
- **postLog** (bool) console stream just before save(`gulp.dest` function) stream. same as `log` above.
- **get** (function) Just in case if you want to get stream.**NOTE** it will not effect the stream.

## License
MIT

[g-src-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
[g-dest-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options
[g-watch-rf]: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb

[g-filter-api]: https://www.npmjs.com/package/gulp-filter#filterpattern-options
[g-filter-opts]: https://www.npmjs.com/package/gulp-filter#options
[gulp-replace]: https://www.npmjs.com/package/gulp-replace

[gulp-uglify]: https://www.npmjs.com/package/gulp-uglify
[gulp-htmlmin]: https://www.npmjs.com/package/gulp-htmlmin
[gulp-clean-css]: https://www.npmjs.com/package/gulp-clean-css
[gulp-mincss-opts]: https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
