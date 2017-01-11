function test(cb) {
	return cb(true);
}

test(
	()=>{
		console.log('Working...!!!')
	}
);

