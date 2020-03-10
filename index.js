const https = require("https");
const http = require("http");
const { isHttps, isUrl } = require("./validate");
const {
	handleResponse,
	headerFilter,
	handlePreflight,
	notFound
} = require("./http-utils")

const server = http.createServer();

server.on("request", (req, res) => {
	// Home page
	if (req.url == "/") {
		return res.end("CORS Proxy - Made by Senpai (Aevuive)");
	}
	
	const path = req.url;
	const url = path.slice(1);
	const headers = headerFilter(req.headers);
	
	// CORS
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	// Preflight Request
	if (req.method == "OPTIONS") return handlePreflight(req, res);
	
	if (!isUrl(url)) return notFound(res);
	
	const options = {
		method: req.method,
		headers: headers
	}
	let request; 

	if (isHttps(url)) {
		request = https.request(url, options, handleResponse.bind(null, res));
	} else {
		request = http.request(url, options, handleResponse.bind(null, res));
	}
	
	req.pipe(request);
});

server.listen(3000);