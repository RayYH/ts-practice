let Duck = function () {
}
let Chicken = function () {
}

Duck.prototype.sound = function () {
  console.log('ga ga ga');
}

Chicken.prototype.sound = function () {
  console.log('ke ke ke');
}

let makeSound = function (animal) {
  animal.sound();
}

makeSound(new Duck());
makeSound(new Chicken());
