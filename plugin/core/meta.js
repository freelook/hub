module.exports = function(plugin) {

    plugin.log404 = function(data) {
        data.res.sendStatus(404);
    };

};