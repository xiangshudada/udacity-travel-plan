const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeApiRequest(url, is_async) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, is_async);
	xhr.send(null);
	return JSON.parse(xhr.responseText);
}

module.exports = {
	makeApiRequest
}