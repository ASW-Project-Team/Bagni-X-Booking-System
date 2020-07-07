exports.serve_client_app = function(req, res) {
	res.sendFile(ANGULAR_CLIENT_PATH + '/index.html');
};

exports.serve_plain_404 = function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
};

module.exports.correct_save = function (user, status, res) {
		user.save((saveErr, updatedUser) => {
			if (saveErr) {
				res.send(saveErr);
			}
			res.status(200).json(updatedUser);
		});
	}
