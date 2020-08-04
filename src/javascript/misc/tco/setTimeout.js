function func(n) {
  console.log(n);
  setTimeout(() => {
    func(n - 1)
  }, 0)
}

setTimeout(() => {
  func(1000)
}, 0);

// use idea debugger, you can see how this works
