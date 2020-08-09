let fs = require('fs')

// 1）回调 after函数来解决
// 2）发布订阅 发送emit 订阅on
// 顺便一提 观察者模式与 发布订阅模式的区别，发布方与订阅方是有没关系的，发布的时候不管你有没有订阅，订阅了也不管你有没有发布。而观察者模式是利用了发布订阅，但是会观察订阅自己的成员，两边有直接通信
let event = {
    _arr: [], //发布和订阅之间没有任何关系，不管你有没有订阅，不管你有没有发布
    //发布于订阅是平行的关系，是操作一个中间的内容，中间的内容
    on(fn) {
        this._arr.push(fn)
    },
    emit() {
        this._arr.forEach(fn => fn())
    }
}

//绑定多个事件
event.on(function () { //这个函数不会立即执行
    console.log('读取一个')
})
event.on(function () { //这个函数不会立即执行
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
})

let school = []
fs.readFile('./name.txt', 'utf8', function (err, data) {
    school.name = data
    event.emit() //触发事件
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
    school.age = data
    event.emit() //触发事件
})