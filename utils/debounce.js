// function to delay till threshold only execute
function throttleEnd(fn, threshhold = 300) {
    var deferTimer;

    return (...args) => {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(() => {
            fn.apply(this, args);
        }, threshhold);
    };
}

// function to execute first and delay till threshold till the next one
function throttleStart(fn, threshhold = 300) {
    let Timer

    return (...args) => {

        if (!Timer) {
            fn.apply(this, args);
        }

        // hold on to it
        clearTimeout(Timer);
        Timer = setTimeout(function () {
            Timer=undefined;
        }, threshhold);
    };
}

export { throttleEnd, throttleStart };