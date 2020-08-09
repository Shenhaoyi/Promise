//vue特点  数据变化就更新视图，监控数据变化
//观察者模式与发布订阅的区别就是：需要把观察者放在被观察者中。一个是主动收集，一个是通过一个中间内容或者订阅的人


//观察者
class Observer {
    constructor(name) {
        this.name = name
    }
    update(newState) {
        console.log(this.name + '接收到:' + newState)
    }
}
//被观察者
class Subject {
    constructor(name) {
        this.name = name
        this.arr = []
        this.state = '开心'
    }
    attach(o) {
        this.arr.push(o)
    }
    setState(newState) {
        this.state = newState
        this.arr.forEach(o => o.update(newState))
    }
}
let baby = new Subject('宝宝')
let father = new Observer('爸爸')
let mother = new Observer('妈妈')

baby.attach(father)
baby.attach(mother)
baby.setState('不开心')
baby.setState('开心')

//promise
//优点：1）解决回调地域问题，2）处理多个异步并发问题
//缺点：1）基于回调，2）无法终止

//新的方案async await