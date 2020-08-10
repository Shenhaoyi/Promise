let Promise = require('./promise')

let fs = require('fs')

function read(url) {
    // return new Promise((resolve, reject) => {
    //     fs.readFile(url, 'utf8', function (err, data) {
    //         if (err) reject(err)
    //         resolve(data)
    //     })
    // })
    //Promise.defer() 可以解决嵌套问题
    let dfd = Promise.defer()
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) dfd.reject(err)
        dfd.resolve(data)
    })
    return dfd.promise
}

read('./name.txt').then(data => {
    console.log(data)
})