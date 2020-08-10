//解决异步并发，同步处理结果

let Promise = require('./promise')

let fs = require('fs')


function read(url) {
    let dfd = Promise.defer()
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) dfd.reject(err)
        dfd.resolve(data)
    })
    return dfd.promise
}

function isPromise(x) {
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then //当前有then方法，姑且认为 x 是个Promise
            if (typeof then === 'function') {
                return true
            }
        } catch (err) {
            return false
        }
    } else {
        return false
    }
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length
        let arr = new Array(len)
        let count = 0

        function processData(i, data) {
            arr[i] = data
            count++
            if (count === len) {
                resolve(arr)
            }
        }

        for (let i = 0; i < len; i++) {
            current = promises[i]
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data)
                }, err => {
                    reject(err)
                })
            } else {
                processData(i, current)
            }
        }
    })
}

Promise.all([1, 2, 3, read('./name.txt'), read('./age.txt'), 6, 7]).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})