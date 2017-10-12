(function(module) {

    "use strict";

    var plugin = {};
    plugin.loaders = [];

    require('./core/home.js')(plugin);
    require('./core/category.js')(plugin);
    require('./core/meta.js')(plugin);
    require('./core/trends.js')(plugin);
    require('./core/deals.js')(plugin);

    plugin.load = function(params, callback) {
        plugin.loaders.map(function(loader) {
            loader(params);
        });
        callback();
    };

    module.exports = plugin;

})(module);
