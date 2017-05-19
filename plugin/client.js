define('fli/client', ['components', 'forum/topic/images'], function(components, images) {
    var FLI = {};

    FLI.init = function() {
        $(window).on('action:category.loaded', function() {
            var $topics = components.get('category/topic');
            images.wrapImagesInLinks($topics);
            $topics.not(':has(.iframely-link)')
                .addClass('teaser-post')
                .find('[component="post/content"]')
                .addClass('panel panel-default');
        });
    };

    FLI.cache = function() {
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            var done = originalOptions.success || $.noop,
                url = originalOptions.url;
            options.beforeSend = function() {
                var proceed = true;
                try {
                    var item = sessionStorage.getItem(url);
                    if (item) {
                        var jsonItem = JSON.parse(item);
                        if (jsonItem.expire > Date.now()) {
                            done(jsonItem.data);
                            proceed = false;
                        }
                        else {
                            sessionStorage.removeItem(url);
                        }
                    }
                }
                catch (e) {
                    proceed = true;
                }
                return proceed;
            };
            options.success = function(data, textStatus) {
                if (data) {
                    try {
                        sessionStorage.setItem(url, JSON.stringify({
                            data: data,
                            expire: Date.now() + 600000
                        }));
                    }
                    catch (e) {
                        console.log('Can not cache:', data);
                    }
                }
                done(data);
            };
        });
    };

    return FLI;
});

$(document).ready(function() {
    require(['fli/client'], function(fli) {
        fli.cache();
        fli.init();
    });
});