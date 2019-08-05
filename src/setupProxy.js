const proxy = require('http-proxy-middleware');

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

module.exports = function(app) {
    app.use(proxy('/api', { target: apiUrl }));
};