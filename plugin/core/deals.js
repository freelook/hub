var _ = require.main.require('lodash');
var async = require.main.require('async');
var request = require.main.require('request');
var helpers = require.main.require('./src/controllers/helpers');
var config = module.parent.require('./config.json');
var Trends = require('./trends.js');
var OperationHelper = require('apac').OperationHelper;
var oph = new OperationHelper({
    awsId: config.oph.awsId,
    awsSecret: config.oph.awsSecret,
    assocId: config.oph.assocId
});

function Deals(plugin) {

    plugin.loaders.push(function(params) {
        var router = params.router;
        var middleware = params.middleware;
        router.get('/deals/:deal?', middleware.buildHeader, Deals.render);
        router.get('/api/deals/:deal?', Deals.render);
    });

}

Deals.render = function(req, res, next) {

    var deal = Deals.pathToText(req.params.deal);
    var title = [!!deal ? deal.concat(' - ') : '', '[[global:fli.deals]]'].join('');
    var description = ['[[global:fli.deals]]', !!deal ? ': '.concat(deal) : ''].join('');
    var data = {
        title: title,
        breadcrumbs: helpers.buildBreadcrumbs([{
            text: '[[global:fli.deals]]'
        }]),
        template: 'deals',
        lang: req.sessionStore && req.sessionStore.lang,
        deal: deal
    };
    if (res.locals) {
        res.locals.metaTags = [{
                name: 'title',
                content: title,
            },
            {
                property: 'og:title',
                content: title,
            },
            {
                name: 'description',
                content: description,
            },
            {
                property: 'og:description',
                content: description,
            },
        ];
    }

    async.parallel({
        suggest: function(next) {
            Deals.suggest(data, next);
        },
        web: function(next) {
            if (data.deal) {
                Deals.web(data.deal, next);
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

};

Deals.suggest = function(data, next) {
    Trends.suggest({ trend: data.deal, lang: data.lang }, next);
};

Deals.web = function(deal, next) {
    async.waterfall([
        function(next) {
            oph.execute('ItemSearch', {
                'SearchIndex': 'All',
                'Keywords': deal,
                'ResponseGroup': 'Large'
            }).then(function(response) {
                next(null, _.get(response, 'result.ItemSearchResponse.Items.Item'));
            }).catch(function(err) {
                next(err);
            });
        },
        function(items, next) {
            Deals.map(items, next);
        },
    ], next);
};

Deals.pathToText = function(path) {
    return Trends.pathToText(path);
};

Deals.map = function(items, next) {
    var results = _.values(items).map(function(item) {
        return {
            title: _.get(item, 'ItemAttributes.Title') || '',
            img: _.get(item, 'LargeImage.URL') || '',
            url: _.get(item, 'DetailPageURL') || '',
            content: _.chain(item).get('EditorialReviews.EditorialReview.Content').truncate({ length: 300 }).value() || '',
            price: _.get(item, 'OfferSummary.LowestNewPrice.FormattedPrice') || '',
            ASIN: _.get(item, 'ASIN') || '',
        };
    });
    next(null, { results: results });
};

module.exports = Deals;
