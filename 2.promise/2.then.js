// let Promise = require('./promise')

let fs = require('fs')
//需求，链式读取文件


// 1）回调地域：丑；2）异步错误问题不能统一
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     if (err) //...
//         fs.readFile('./age.txt', 'utf8', function (err, data) {

//         })
// })


function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

//如果一个promise的then方法中的函数（成功和失败）返回的结果是一个promise的话，会自动将这个promise执行,采用这个返回的promise的状态，并将状态对应的结果向后面的传递
read('./name.txt').then(data => {
    return read(data)
}, err => {
    console.log(err)
}).then((data) => {
    console.log(data)
    return 1
    //如果then方法中的函数（成功和失败）返回的结果是undefined或其他普通值，那么会将这个普通值作为下一次的成功结果
}, (err) => {
    console.log(err)
}).then(data => {
    console.log(data) //我希望走到这个promise就不要在往下走then了 
    return new Promise(() => {}) //返回一个pending的promise
}, err => {
    console.log(err)
}).then(() => {
    console.log('success')
}, err => {
    console.log(err)
})

//只有两种情况会失败，要么返回一个失败的promise，要么抛出错误