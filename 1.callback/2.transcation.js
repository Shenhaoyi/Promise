//react 的setState

function perform(anyMethods, wrappers) {
    wrappers.forEach(wrapper => {
        wrapper.initialize()
    });
    anyMethods()
    wrappers.forEach(wrapper => {
        wrapper.close()
    })

}

perform(function () {
    console.log('say')
}, [{
    initialize: function () {
        console.log('wrapper1 beforeSay')
    },
    close: function () {
        console.log('wrapper1 close')
    }
}, {
    initialize: function () {
        console.log('wrapper2 beforeSay')
    },
    close: function () {
        console.log('wrapper2 close')
    }
}])