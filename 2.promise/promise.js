const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断 x 的值
    //按照规范写，所有的 Promise 都遵循这个规范，写法必须兼容所有 Promise
    // 如果 promsie2 和 x 是同一个对象，就报错，会进入循环？
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    //数据类型判断 typeof constructor instanceof toString
    if (typeof x === 'object' && typeof x !== null || typeof x === 'function') {
        // let called //有的库会成功和失败都调用,防止多次调用，暂时不用了
        try {
            let then = x.then
            if (typeof then === 'function') { //当前有then方法，姑且认为 x 是个Promise
                //注意，是返回结果中的 Promise，我们需要对其立即执行 then，才能知道到底是成功的才是失败的，以及得到成功和失败的值，也就是下一个 promise2 的状态由这个返回的 Promise 决定
                then.call(x, y => {
                    resolvePromise(promise2, y, resolve, reject) //采用成功结果//递归解析，最终会落到起它分支
                }, r => {
                    reject(r) //采用失败结果
                }) //就是x.then
            } else {
                //普通对象或函数
                resolve(x) //直接成功即可
            }
        } catch (err) {
            reject(err)
        }
    } else {
        //x 是普通值
        resolve(x) //直接让 promise2 成功即可
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING //默认是Pending
        this.value = undefined //成功值
        this.reason = undefined //失败原因
        this.onRejectedCallbacks = [] //成功的回调数组
        this.onFulfilledCallbacks = [] //失败的回调数组
        //下面是两个回调函数？
        //成功函数
        let resolve = (value) => {
            //只有pending是才能修改状态
            if (this.status === PENDING) {
                this.value = value
                this.status = FULFILLED
                this.onFulfilledCallbacks.forEach(cb => cb()) //发布
            }
        }
        //失败函数
        let reject = (reason) => {
            //只有pending时才能修改状态
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(cb => cb()) //发布
            }
        }
        //执行器执行错误也是直接reject
        try {
            executor(resolve, reject) //默认执行器立刻执行，接收的两个参数是
        } catch (err) {
            console.log(err)
            reject(err) //如果执行时发生错误，会使得
        }
    }
    then(onfulfilled, onrejected) { //then方法就是异步的
        let promise2 = new Promise((resolve, reject) => { //这里的再传给构造函数，立即执行，其实是个闭包，使用箭头函数，使得 this 是现在的这个 Promise，参数都是现在的 Promise, 有点绕
            //前两个条件同步的时候就执行
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        //x 可能是 Promise
                        //判断 x 的值 => promise2 的状态
                        //resolve(x),不是简单这样写，如果是 Promise 失败的话是要执行reject的
                        resolvePromise(promise2, x, resolve, reject) //显然，promsie2还没被构造完，就要用到它是不可能的
                    } catch (err) {
                        console.log(err)
                        reject() //问题来了，这个reject是谁的reject呢？,因为它是个箭头函数，箭头函数的this写在哪。就已经确定了这个this就是写的地方外面的this，这是闭包！！！！
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            } else {
                //如果是异步,那么状态是pending，就先订阅好，同一个promise被多次then
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

}
module.exports = Promise