let p = new Promise((resolve, reject) => {
    resolve(1)
    // reject(2)
})

p.finally(() => { //无论成功失败都执行，并且将状态进行传递
    console.log('最终的')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 4000)
    })
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

Promise.prototype.finally = function (cb) {
    return this.then(data => {
        // 外层的 return 为了返回一个值穿透的 Promise
        // 如果 cb() 中返回 Promise， 内层的 Primise.resolve 会等待 cb()执行完，并解析这个 Promise，同时需要发生值穿透，使用 .then(() => data)，利用闭包将 data 向后传递，这个 then 中返回值会被解析，本身是成功就成功，本身是失败就失败，所以依然是值穿透
        return Promise.resolve(cb()).then(() => data)
    }, err => {
        return Promise.resolve(cb()).then(() => {
            throw err
        })
    })
}