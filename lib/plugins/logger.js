
var intercept = require('gulp-intercept');
module.exports = function logger(stream, opts) {
	return stream.pipe(intercept(function(file){
		opts = (typeof opts === 'string' && file[opts] ) ? opts : "contents";
		console.log(file[opts].toString()); return file;
	}));
}