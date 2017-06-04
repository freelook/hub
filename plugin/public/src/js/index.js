$(document).ready(function() {
    require(['fli/client'], function(fli) {
        fli.cache();
        fli.init();
    });
});