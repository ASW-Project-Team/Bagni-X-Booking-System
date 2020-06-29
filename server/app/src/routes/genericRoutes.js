module.exports.set = function(app) {
    const genericController = require('../controllers/genericController');

    // remaining calls to the /api/*, are pointing to non-existing endpoints.
    // The server responds with a plain simple 404
    app.use('/api/*', genericController.serve_plain_404);

    // Redirect all remaining routes to Angular, serving index.html.
    // This is important in order to support deep links inside the app,
    // and to show a polished 404 if the request is not an API call.
    app.use("/*", genericController.serve_client_app);
};
