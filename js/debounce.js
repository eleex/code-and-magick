(function() {
    window.debounce = function(fun, param, interval) {
        if (lastTimeout) {
            window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function() {
            fun(param);
        }, interval);
    };
})();
