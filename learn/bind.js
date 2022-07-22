// -----------------------1: specify this value ----------------------

let person = {
    name: 'John Doe',
    getName: function() {
        console.log(this.name);
    }
};

person.getName()
// OUT : John Doe

// function received separately from the person object.
setTimeout(person.getName, 100);
// OUT : undefined

// gets person from outerscope
setTimeout(function () {
    person.getName();
}, 100);
// OUT : John Doe

// this value set to the person object
setTimeout(person.getName.bind(person), 100);
// OUT : John Doe


var myButton = {
	content: 'OK',
	click() {
	  console.log(this.content + ' clicked');
	}
  };

  myButton.click();

  var looseClick = myButton.click;
  looseClick(); // not bound, 'this' is not myButton - it is the globalThis

  var boundClick = myButton.click.bind(myButton);
  boundClick(); // bound, 'this' is myButton

// --------------------- 2: reuse methods ------------------------

// Borrow methods from other objects

let runner = {
    name: 'Runner',
    run: function(speed) {
        console.log(`${this.name} runs at ${speed} mph.`);
    }
};

let flyer = {
    name: 'Flyer',
    fly: function(speed) {
        console.log(`${this.name} flies at ${speed} mph.`);
    }
};

runner.run(20)
runner.run = runner.run.bind(flyer)
runner.run(500)

// ---------------------- 3: curry a function--------------------------


// bind some params

// Example showing binding some parameters
var sum = function(a, b) {
	return a + b;
  };

var add5 = sum.bind(null, 5);
console.log(add5(10));