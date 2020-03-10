function handleResponse(res, response) {
	res.writeHead(200, response.headers);
	response.pipe(res);
}

function headerFilter(reqHeaders) {
	const headers = {...reqHeaders};
	
	delete headers["host"];
	delete headers["user-agent"];
	delete headers["accept"];
	delete headers["origin"];
	delete headers["sec-fetch-site"];
	delete headers["sec-fetch-mode"];
	delete headers["referer"];
	return headers;
}

function handlePreflight(req, res) {
	const allowMethod = req.headers["access-control-request-method"];
	const allowHeaders = req.headers["access-control-request-headers"];
	
	res.setHeader("Access-Control-Allow-Methods", allowMethod);
	res.setHeader("Access-Control-Allow-headers", allowHeaders);
	return res.end();
}

function notFound(res) {
	res.writeHead(404);
	res.end("404 not found");
}

module.exports = {
	handleResponse,
	headerFilter,
	handlePreflight,
	notFound
}