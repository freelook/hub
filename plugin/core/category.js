module.exports = function(plugin) {

    var categories = require.main.require('./src/categories');

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

};