exports.serveClientApp = function(req, res) {
	res.sendFile(CONFIGS.angularClientPath + '/index.html');
};

module.exports.servePlain404 = function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
};
