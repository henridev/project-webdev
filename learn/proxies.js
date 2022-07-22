let sayHello = function() {
	console.log("Hello")
}

sayHello.sayWorld = function() {
	console.log("World")
}

sayHello();
sayHello.sayWorld();