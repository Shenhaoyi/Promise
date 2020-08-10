Promise.prototype.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(data => {
                resolve(data)
            }, err => {
                reject(err)
            })
        })
    })
}

let p1 = new Promise((resolve, reject) => {
    resolve(1)
})
let p2 = new Promise((resolve, reject) => {
    reject(2)
})
let p3 = new Promise((resolve, reject) => {
    resolve(3)
})
let p4 = new Promise((resolve, reject) => {
    reject(4)
})
Promise.race([p1, p2, p3, p4]).then(data => {
    console.log('success:' + data)
}, err => {
    console.log('error:' + err)
})