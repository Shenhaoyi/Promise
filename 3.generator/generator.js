// generator es6 规范里 和 Promise 配合使用
// 特点是可以暂停
// * yield 传出
// iterator 迭代器

//for of 循环 必须有 iterator  (Array.from  [...likeArray])
// let obj = {
//     0: 1,
//     1: 2,
//     *[Symbol.iterator]() { //可迭代的方法
//         for (let i = 0; i < this.length; i++) {
//             yield this[i]
//         }
//         // let index = 0
//         // return {
//         //     next: () => { //如果不用箭头函数，函数内部的 this 不是pbj
//         //         return {
//         //             value: this[index], //这个this是构造前对象前的this，对象被构造完才会有自己的this
//         //             done: this.length === index++
//         //         }
//         //     }
//         // }
//     }, //元编程，修改js 的行为
//     length: 2
// }
// console.log([...obj])
// console.log(Array.from(obj))
//==================================================================================================

// function* read() {
//     yield 1
//     yield 2
//     yield 3
//     yield 4
//     return 5
// }
// let it = read()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
//====================================================================
// 打印？


// function* read() {
//     let a = yield 'hello'
//     console.log(a)
//     let b = yield 'world'
//     console.log(b)
// }
// let it = read()
// console.log(it.next()) //第一册next传参是无意义的
// console.log(it.next(1)) //会传递给上一次 yield 的返回值
// console.log(it.next(2))

//=====================================================================
// 与 Promise 结合
let fs = require('fs').promises
// fs.readFile('./name.txt', 'utf8').then(data => {
//     console.log(data)
// })

function* read() {
    try {
        let content = yield fs.readFile('./name.txt', 'utf8')
        let r = yield fs.readFile(content, 'utf8')
        return r
    } catch (e) {
        console.log(e)
    }

}


//==================================================================
//嵌套的写法
// let it = read()
// let {
//     value,
//     done
// } = it.next()
// //保证是 Promise
// Promise.resolve(value).then(data => {
//     console.log(data)
//     let {
//         value,
//         done
//     } = it.next(data) //给上一个 yield 返回值
//     Promise.resolve(value).then(data => {
//         console.log(data)
//         let {
//             value,
//             done
//         } = it.next(data)
//         console.log(value)
//     })
// })

//=================================================================================
// co
function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {
                value,
                done
            } = it.next(data)
            //按照 done 状态进行递归，直到为 true
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data) //给上一个 yield 返回值
                }, reject)
            } else {
                resolve(data)
            }
        }
        next() //第一次不需要传
    })
}

//希望co实现下面的效果，就是read()之后的结果直接传入 Promise 的 resolve 中
co(read()).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})

//=================================================================================
//async await 基于 generator +co 库
async function read() {
    try {
        let content = await fs.readFile('./name.txt', 'utf8')
        let r = await fs.readFile(content, 'utf8')
        return r
    } catch (e) {
        console.log(e)
    }
}