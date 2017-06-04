module.exports = function(plugin) {

    var async = require.main.require('async');
    var request = require.main.require('request');
    var helpers = require.main.require('./src/controllers/helpers');
    var config = module.parent.require('./config.json');

    plugin.load = function(params, callback) {

        var router = params.router;
        var middleware = params.middleware;

        function render(req, res, next) {

            var data = {
                title: '[[global:fli.trends]]',
                breadcrumbs: helpers.buildBreadcrumbs([{
                    text: '[[global:fli.trends]]'
                }]),
                template: 'trends',
                trend: req.params.trend
            };

            async.waterfall([
                function(next) {
                    get(data.trend, next);
                },
                function(body, next) {
                    parse(body, next);
                },
                function(values) {
                    data.values = values;
                    res.render(data.template, data);
                }
            ], next);

        }

        function get(trend, next) {
            var searchUrl = '';

            if (!trend) {
                searchUrl = config.api.trends + 'p35';
            }

            request
                .get(searchUrl, function(err, response, body) {
                    if (!err && response.statusCode === 200) {
                        try {
                            next(null, body);
                        }
                        catch (e) {
                            next(e);
                        }
                    }
                    else {
                        next(err);
                    }
                })
                .on('error', function(error) {
                    next(error);
                });
        }

        function parse(body, next) {
            //todo parse
            var trendTextRe = /<a.+>(.+?)<\/a>/gim,
                values = [],
                value;
            while ((value = trendTextRe.exec(body)) !== null) {
                values.push({
                    text: value[1]
                });
            }
            next(null, values);
        }

        router.get('/trends/:trend?', middleware.buildHeader, render);
        router.get('/api/trends/:trend?', render);

        callback();

    };

};