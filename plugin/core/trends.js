var async = require.main.require('async');
var request = require.main.require('request');
var helpers = require.main.require('./src/controllers/helpers');
var config = module.parent.require('./config.json');
var trendsByLangs = {
    'ru': 'p35',
    'uk': 'p35',
    'en-US': 'p1',
    'de': 'p15'
};


function Trends(plugin) {

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
                lang: req.sessionStore && req.sessionStore.lang,
                trend: Trends.pathToText(req.params.trend)
            };

            async.parallel({
                suggest: function(next) {
                    Trends.suggest(data, next);
                },
                web: function(next) {
                    if (data.trend) {
                        Trends.web(data.trend, next);
                    }
                    else {
                        next();
                    }
                },
                image: function(next) {
                    if (data.trend) {
                        Trends.image(data.trend, next);
                    }
                    else {
                        next();
                    }
                }
            }, function(err, values) {
                data.err = err;
                data.values = values;
                res.render(data.template, data);
            });

        }

        router.get('/trends/:trend?', middleware.buildHeader, render);
        router.get('/api/trends/:trend?', render);

        callback();

    };

}

Trends.get = function(url, next) {
    if (url) {
        request
            .get({
                url: url,
                headers: {
                    'User-Agent': 'request',
                    'Content-Type': 'text/plain'
                }
            }, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    try {
                        next(null, body);
                    }
                    catch (err) {
                        next(new Error(err));
                    }
                }
                else {
                    next(new Error(err));
                }
            })
            .on('error', function(err) {
                next(new Error(err));
            });
    }
    else {
        next(true);
    }
};

Trends.suggest = function(data, next) {
    if (data && data.trend) {
        async.waterfall([
            function(next) {
                var autocompleteUrl = Trends.buildUrl(config.cache24h, config.api.autocomplete, encodeURIComponent(data.trend));
                Trends.get(autocompleteUrl, next);
            },
            function(body, next) {
                Trends.toJSON(body, next);
            },
            function(autocomplete, next) {
                try {
                    var values = autocomplete[1]
                        .filter(function(text) {
                            return text && !~text.indexOf('/');
                        })
                        .map(function(text) {
                            return {
                                text: text,
                                path: Trends.textToPath(text)
                            };
                        }) || [];
                    next(null, values);
                }
                catch (e) {
                    next(e);
                }
            },
        ], next);
    }
    else {
        async.waterfall([
            function(next) {
                var trendsUrl = Trends.buildUrl(config.cache24h, config.api.trends, trendsByLangs[data.lang] || trendsByLangs.ru);
                Trends.get(trendsUrl, next);
            },
            function(body, next) {
                Trends.parse(body, next);
            },
        ], next);
    }
};

Trends.web = function(trend, next) {
    async.waterfall([
        function(next) {
            var webUrl = Trends.buildUrl(config.cache30d, config.api.web, encodeURIComponent(trend));
            Trends.get(webUrl, next);
        },
        function(body, next) {
            Trends.toJSON(body, next);
        },
    ], next);
};

Trends.image = function(trend, next) {
    async.waterfall([
        function(next) {
            var imageUrl = Trends.buildUrl(config.cache30d, config.api.image, encodeURIComponent(trend));
            Trends.get(imageUrl, next);
        },
        function(body, next) {
            Trends.toJSON(body, next);
        },
    ], next);
};

Trends.toJSON = function(text, next) {
    try {
        var json = JSON.parse(text);
        next(null, json);
    }
    catch (e) {
        next(e);
    }
};

Trends.parse = function(body, next) {
    var trendTextRe = /<a.+>(.+?)<\/a>/gim,
        values = [],
        value;
    while ((value = trendTextRe.exec(body)) !== null) {
        var text = value[1];
        values.push({
            text: text,
            path: Trends.textToPath(text)
        });
    }
    next(null, values);
};

Trends.buildUrl = function() {
    return Array.prototype.join.call(arguments, '');
};

Trends.textToPath = function(text) {
    return (text || '').replace(/ /gim, '-');
};

Trends.pathToText = function(path) {
    return (path || '').replace(/-/gim, ' ');
};

module.exports = Trends;