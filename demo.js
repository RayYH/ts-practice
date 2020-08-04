function func(n) {
  console.log(n);
  setTimeout(func(n - 1), 400);
}

setTimeout(func(1000), 400);
