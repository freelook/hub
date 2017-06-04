module.exports = function(plugin) {

    var async = require.main.require('async');
    var categories = require.main.require('./src/categories');
    var controllers = require.main.require('./src/controllers');
    var validator = require.main.require('validator');
    var meta = require.main.require('./src/meta');
    var user = require.main.require('./src/user');
    var categoriesByLangs = {
        'ru': 'RU',
        'uk': 'UA',
        'en-US': 'EN',
        'de': 'DE'
    };

    plugin.homepageGetCategories = function(data) {
        var lang;
        async.waterfall([
            function(next) {
                if (!data.req.user) {
                    return next(null, meta.config);
                }
                user.getSettings(data.req.uid, next);
            },
            function(settings, next) {
                lang = (data.req.query.lang ? validator.escape(String(data.req.query.lang)) : null) || settings.userLang || settings.defaultLang || categoriesByLangs.ru.toLowerCase();
                categories.getCategoriesByPrivilege('cid:0:children', data.req.uid, 'find', next);
            },
            function(categoriesData, next) {
                var categoryName = categoriesByLangs[lang];
                if (categoryName) {
                    var categoryData = categoriesData.find(function(category) {
                        return category.name === categoryName;
                    });
                }
                if (categoryName && categoryData) {
                    data.req.params.topic_index = '1';
                    data.req.params.category_id = categoryData.cid;
                    data.req.params.slug = categoryData.name.toLowerCase();
                    controllers.category.get(data.req, data.res, next);
                }
                else {
                    controllers.categories.list(data.req, data.res, next);
                }
            }
        ], data.next);
    };

};