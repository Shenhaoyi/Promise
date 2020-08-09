let fs = require('fs')


//==========================================================================
//同时写两个异步方法
// let school = {}
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     console.log(data)
//     school.name = data
// })

// fs.readFile('./age.txt', 'utf8', function (err, data) {
//     console.log(data)
//     school.age = data
// })
// console.log(school) //读文件需要时间，打印出来为空

//==========================================================================

// 如果希望两个读取完成之后再执行console.log
//串行，总时间为每个执行时间相加，第二个要等第一个执行完才执行
// let school = {}
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     console.log(data)
//     school.name = data
//     fs.readFile('./age.txt', 'utf8', function (err, data) {
//         console.log(data)
//         school.age = data
//         console.log(school) //读文件需要时间，打印出来为空
//     })
// })

//==========================================================================
// 并行
//通过回调来解决 
//目前写法的缺点，需要定义一个变量，但是所有人都可以取修改，不好,而且还得写个函数 ,每次读完之后都要执行out去判断
// let school = {}

// function out() {
//     if (Object.keys(school).length === 2) {
//         console.log(school)
//     }
// }
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     school.name = data
//     out()
// })

// fs.readFile('./age.txt', 'utf8', function (err, data) {
//     school.age = data
//     out()
// })



//==========================================================================
//使用3里面的after
//回调比较不错的版本
function after(times, callback) {
    let school = {}
    return function (key, value) {
        school[key] = value
        if (--times === 0) { //数据全部写入就执行 
            callback()
        }
    }
}

let out = after(2, function () {
    console.log(school)
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
    out('name', data)
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
    out('age', data)
})

//==========================================================================