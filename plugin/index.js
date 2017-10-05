(function(module) {

    "use strict";

    var plugin = {};

    require('./core/home.js')(plugin);
    require('./core/category.js')(plugin);
    require('./core/meta.js')(plugin);
    require('./core/trends.js')(plugin);
    require('./core/deals.js')(plugin);

    plugin.load = function(params, callback) {
        plugin.loadTrends(params);
        plugin.loadDeals(params);
        callback();
    };

    module.exports = plugin;

})(module);