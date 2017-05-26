module.exports = function(plugin) {

    plugin.load = function(params, callback) {

        var router = params.router;
        var middleware = params.middleware;

        function render(req, res, next) {

            var data = {
                trend: req.params.trend
            };

            var template = 'trends';

            res.render(template, data);
        }

        router.get('/trends/:trend?', middleware.buildHeader, render);
        router.get('/api/trends/:trend?', render);

        callback();

    };

};