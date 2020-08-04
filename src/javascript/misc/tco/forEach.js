// consumes stack frame
let func = n => {
  console.log(n);
  if (n instanceof Object) {
    n.forEach(func)
  }
}

let a = [
  [[[[1, 2, 3, 4, 5, 6, 7],],], 1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
]

a.forEach(func)
