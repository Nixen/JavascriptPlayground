
var sys = require("sys"),
    events = require("events"),
    http = require("http");

var l = function(s){
    sys.puts(s);
};



function Dog(barkDb, name){
    this.name = name;
    this.barkDb = barkDb;
}

Dog.prototype = new events.EventEmitter();

Dog.prototype.barkAt = function(dog){
    sys.puts(this.name + " barks at " + dog.name +  ", decibell:" + this.barkDb);
    this.emit("barkAt", dog);
};

Dog.prototype.barkBack = function(dog){
    sys.puts(this.name + " barks back at " + dog.name + ", decibell:" + this.barkDb);
    this.emit("barkBack", dog);
};

Dog.prototype.on("barkAt", function(dog){
    dog.barkBack(this);
});

Dog.prototype.on("barkBack", function(dog){
    sys.puts((this.barkDb > dog.barkDb ? this.name : dog.name) + " wins!");
});

var fido = new Dog(99, "fido");
var solo = new Dog(98, "solo");


solo.barkAt(fido);







