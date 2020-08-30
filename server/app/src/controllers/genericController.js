exports.serveClientApp = function(req, res) {
	res.sendFile(ANGULAR_CLIENT_PATH + '/index.html');
};

module.exports.servePlain404 = function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
};