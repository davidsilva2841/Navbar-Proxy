const search = require('../routes/search');

module.exports = function (app) {
    app.use('/api/search', search);
};
