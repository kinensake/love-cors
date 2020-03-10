function isHttps(url) {
	return /^https/.test(url);
}

function isUrl(url) {
	return /^https?:\/\/.+/.test(url);
}

module.exports = {
	isHttps,
	isUrl
}