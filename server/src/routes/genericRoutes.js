module.exports.set = function(app) {
    const genericController = require('../controllers/genericController');

    // remaining calls to the /api/*, are pointing to non-existing endpoints.
    // The server responds with a plain simple 404
    app.use('/api/*', genericController.servePlain404);

    // every call to the assets endpoint, is resolved as static. It is used
    // to handle the access to images.
    app.use('/assets/*', genericController.serveAssets);

    // Redirect all remaining routes to Angular, serving index.html.
    // This is important in order to support deep links inside the app,
    // and to show a polished 404 if the request is not an API call.
    app.use("/*", genericController.serveClientApp);
};
