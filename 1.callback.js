//AOP 面向切片编程
function say(who) {
    console.log(who + '说话')
}
Function.prototype.before = function (beforeFn) {
    //本函数使得调用者在接收的参数后面执行

    //this是谁呢？谁调用的before，this就是谁，本例中就是say，可以通过闭包在返回函数中使用！
    //this:say

    //返回函数，在外面执行（也可以直接在在这里执行，看需求）
    var _this = this
    return function () {
        beforeFn()
        //如果不用闭包传入this，函数内部的this与创建函数环境的 this 无关
        _this.apply(null, arguments)
        //不能直接 this = this的！
    }

    //剩余运算符，只能在最后一个参数中使用
    return (...args) => { //箭头函数没有this 没有arguments 没有原型
        beforeFn()
        this(...args) //展开  //箭头函数不能直接使用arguments了
    }

}

let newFn = say.before(function () {
    console.log('说话之前')
})
newFn('小黑')

//===============================================================================================

//vue2 劫持 数组方法的 思路实现

let oldPush = Array.prototype.push

// function push(...args) {
//     console.log('数组更新啦')
//     oldPush.call(this, ...args)
// }

// let arr = [1, 2, 3]
// push.call(arr, 4, 5, 6, 7)
// console.log(arr)
Array.prototype.push = function (...args) {
    console.log('数组更新啦')
    oldPush.call(this, ...args)
}
let arr = [1, 2, 3]
arr.push(4, 5, 6, 7)
console.log(arr)