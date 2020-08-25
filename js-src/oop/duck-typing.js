let duck = {
  duckSinging: function () {
    console.log('ga ga ga');
  }
};

let chicken = {
  duckSinging: function () {
    console.log('ga ga ga');
  }
};

let choir = [];

let joinChdir = function (animal) {
  if (animal && typeof animal.duckSinging === 'function') {
    choir.push(animal);
    console.log('Welcome to choir!');
    console.log('the total count of choir\'s members is: ' + choir.length);
  }
};

joinChdir(duck);
joinChdir(chicken);
