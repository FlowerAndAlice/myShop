export default {
    throttle: function(fn, delay) {
        // 定时器+时间戳
        var delays = delay || 60
        var timer = null;
        var startTime = Date.now();
        return function() {
            // 结束时间
            var curTime = Date.now();
            var interval = delays - (curTime - startTime);
            var _this = this;
            var args = arguments;
            clearTimeout(timer);
            if (interval <= 0) {
                fn.apply(_this, args)
                startTime = Date.now()
            } else {
                timer = setTimeout(fn, delays);
            }
        }
    }
}