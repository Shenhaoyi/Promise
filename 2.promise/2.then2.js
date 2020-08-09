//1）then中的函数判断成功和失败的返回结果
//2） 如果返回的是Promise，就采用它的状态
//3） 如果不是 直接将结果作为成功的结果传递下去
let Promise = require('./promise')
// let p = new Promise((resolve, reject) => {
//     resolve(1)
// })
// let promise2 = p.then(data => {
//     // throw new Error('222')
//     console.log(data)
//     // return promise2
//     return 1000
// }, err => {
//     console.log(err)
// })

// promise2.then(data => {
//     console.log(data)
// }, err => {
//     console.log(err)
// })

let p = new Promise((resolve, reject) => {
    resolve(1)
})

let promise2 = p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('hello')
            reject(new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('hello')
                }, 1000)
            }))
        }, 1000)
    })
}, err => {
    console.log(err)
})
promise2.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})


//可选参数
let p3 = new Promise((resolve, reject) => {
    reject(1)
})
//中见无参数会产生参数穿透
p3.then(data => data, err => {
    throw err
}).then(data => {
    console.log(data)
    console.log(2)
}, err => {
    console.log(err)
})