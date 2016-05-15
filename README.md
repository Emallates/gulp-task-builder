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
Node module which can build you task using a JSON object of tasks.

<!--NO_HTML-->

Table of Contents
-----------------
**Getting Started**

1. [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  
1. [Features](#features)
  - [Compress](#compress)
  - [Concatinate](#concatinate)
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
      "task1":{"src":"path/to/source/files", dest:"path/to/save"}
    }
    builder.buildTasks(tasks);
    builder.runTasks();

**[Task Options](#client-options)**





Client options
-------------
Each task contains some required options and also some optional.

#### Required
- `src` (string) Gulp [src][g-src-rf] parameter. Path of your source files. It an be also regEx. [More Details][g-src-rf].
- `dest` (string) Gulp [dest][g-dest-rf] parameter. Path wher you want to save your files. [More Details][g-dest-rf].
- `ext` (string) extention of file which defined in `src` option.

#### Optional
- `save` (bool) Set `true` if you want to save your output. Default `true`.
- `log` (string|bool) log/console content of stream. All options of [glob-stream](https://github.com/gulpjs/glob-stream) are supported. Default value is `contents`.
- `preLog` (bool) console stream before processing. same as `log` above.
- `postLog` (bool) console stream just before save(`gulp.dest` function) stream. same as `log` above.
- `get` (function) Just in case if you want to get stream.**NOTE** it will not effect the stream.

#### Plugins
- `filter` (Object|string|array|function) To filter your files. if you are sending Object then that object should have two properties [match][g-filter-opts] and options. See [gulp-filter][g-filter-api] for more details.
- `concat` (string|object) object contains two properties name and ext. See [gulp-concat](https://www.npmjs.com/package/gulp-concat) for more details
- `replace` (object|array(objects)) Object can be one of these two objects `{target:"", src:""}` this will send to [gulp-replace][gulp-replace] and second `{buildName:replacement}` buildName (string|RegExp) replacement (String|Array|Object).
- `debug` (bool) Enable [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- `compress` (bool|object) this will use [gulp-uglify][gulp-uglify] if `ext` is `.js`, [gulp-htmlmin][gulp-htmlmin] if `ext` is `.html` and [gulp-clean-css][gulp-clean-css] if `css` is `.css`
- `wrapper` (Object|Array) Each Object have two options header and footer. More [Details](https://www.npmjs.com/package/gulp-wrapper)


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



