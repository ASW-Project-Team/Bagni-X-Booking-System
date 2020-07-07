exports.serve_client_app = function(req, res) {
	res.sendFile(ANGULAR_CLIENT_PATH + '/index.html');
};

module.exports.serve_plain_404 = function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
};

module.exports.correct_save = function (document, status, res) {
	document.save((saveErr, updatedDocument) => {
			if (saveErr) {
				res.send(saveErr);
			}
			res.status(status).json(updatedDocument);
		});
	}
