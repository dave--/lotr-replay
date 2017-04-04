function ajax (url, cb) {
	let httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			cb(httpRequest.responseText);
		}
	};
	httpRequest.open('GET', url);
	httpRequest.send();
}

export default ajax;