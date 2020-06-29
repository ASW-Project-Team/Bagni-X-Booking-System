exports.serve_client_app = function(req, res) {
	res.sendFile(ANGULAR_CLIENT_PATH + '/index.html');
};

exports.serve_plain_404 = function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
};
