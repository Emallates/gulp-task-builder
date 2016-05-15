var wrapper = require('gulp-wrapper');
module.exports = function wrapperRunner(stream, opts, task) {
	var obj = {};
	if(opts.header) obj.header = opts.header;
	if(opts.footer) obj.footer = opts.footer;
	return (obj.header || obj.footer) ? stream.pipe( wrapper(obj) ) : stream;
}