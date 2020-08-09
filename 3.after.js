function after(times, callback) {
    return function () {
        if (--times === 0) {
            callback()
        }
    }
}
//当函数被调用指定次数后才会执行真正要执行的函数
let fn = after(3, () => {
    console.log('really')
})
fn()
fn()
fn()
fn()