let p = new Promise((resolve, reject) => {
    resolve(1)
})

Promise.resolve(p).then(data => {
    console.log('success:' + data)
}, err => {
    console.log('error:' + err)
})

// Promise.resolve(1).then(data => {
//     console.log('success:' + data)
// }, err => {
//     console.log('error:' + err)
// })

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (data) => {
          resolve(data);
        },
        (err) => {
          resolve(err);
        },
      );
    } else {
      resolve(value);
    }
  });
};
