(function(module) {

    "use strict";

    var plugin = {};

    require('./core/home.js')(plugin);
    require('./core/category.js')(plugin);
    require('./core/meta.js')(plugin);
    require('./core/trends.js')(plugin);

    module.exports = plugin;

})(module);