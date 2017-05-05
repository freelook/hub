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

    return FLI;
});

$(document).ready(function() {
    require(['fli/client'], function(fli) {
        fli.init();
    });
});