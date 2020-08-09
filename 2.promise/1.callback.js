//promise的特点
//promise是一个类 
//1）三个状态 等待态（默认） 成功态 失败态 promise aplus上有标准  一旦成功或者失败就不会变化
//2）resolve代表成功，rejected代表失败
//2) promise构造的时候抛出错误也算失败
let Promise = require('./promise')

let promise = new Promise((resolve, reject) => { //这个传入的函数叫做 executor 执行器，会立刻执行
    // throw new Error('失败') //抛出错误也算失败
    setTimeout(() => {
        resolve('成功了')
    }, 1000)
    // resolve('成功了')
    // reject('失败了') //被屏蔽
}).then((value) => {
    console.log(value)
}, (err) => {
    console.log(err)
})