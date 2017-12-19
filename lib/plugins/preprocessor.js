//var Sass = require('gulp-sass')
//var isObject = require('lodash/isObject');

module.exports = function preprocessor(stream, opts, task) {
  throw new Error("Scss not supported yet");
  /*
	var options = (isObject(opts)) ? opts : null;
	switch(task.ext){
		case '.scss': 
    return stream.pipe(Sass(options));
	}
  */
}