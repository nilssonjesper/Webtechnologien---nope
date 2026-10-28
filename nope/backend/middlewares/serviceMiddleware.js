module.exports = function(services) {
    return function(req, res, next) {
        req.services = services;
        next();
    };
};