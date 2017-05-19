(function(module) {

    "use strict";

    var plugin = {};
    var async = module.parent.require('async');
    var validator = module.parent.require('validator');
    var controllers = module.parent.require("./controllers");
    var categories = module.parent.require("./categories");
    var meta = module.parent.require('./meta');
    var user = module.parent.require('./user');
    var categoriesByLangs = {
        'ru': 'UA-RU',
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
                var categoryName = categoriesByLangs[lang] || categoriesByLangs.ru;
                var categoryData = categoriesData.find(function(category) {
                    return category.name === categoryName;
                });
                data.req.params.topic_index = '1';
                data.req.params.category_id = categoryData.cid;
                data.req.params.slug = categoryData.name.toLowerCase();
                controllers.category.get(data.req, data.res, next);
            }
        ], data.next);
    };

    plugin.filterTopicsPrepare = function(data, callback) {
        var sets = typeof data.set === "string" ? [data.set] : data.set;
        categories.getChildren([data.cid], data.uid, function(err, children) {
            if (err) {
                return callback(err, data);
            }

            function addChildren(children) {
                if (children && children.length) {
                    children.forEach(function(child) {
                        sets.push("cid:" + child.cid + ":tids");
                        if (child.children && child.children.length) {
                            addChildren(child.children);
                        }
                    });
                }
            }
            if (children && children[0]) {
                addChildren(children[0]);
            }
            data.set = sets;
            return callback(null, data);
        });
    };

    plugin.log404 = function(data) {
        data.res.sendStatus(404);
    };

    module.exports = plugin;

})(module);