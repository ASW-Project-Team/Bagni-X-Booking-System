const responseGenerator = require('../utils/responseGenerator');

module.exports.serveClientApp = function(req, res) {
	res.sendFile('/', {root: CONFIGS.angularClientPath});
};

module.exports.serveAssets = function(req, res) {
	res.sendFile(req.baseUrl);
};
