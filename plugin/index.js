(function(module) {

    "use strict";

    var plugin = {};
    var async = module.parent.require('async');
    var Controllers = module.parent.require("./controllers")

    plugin.pageView = function(data) {
        data.req.params.topic_index = '1';
        data.req.params.category_id = '5';
        Controllers.category.get(data.req, data.res, data.next);
    };

    module.exports = plugin;

})(module);