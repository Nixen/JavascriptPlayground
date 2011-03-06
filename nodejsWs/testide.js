
var sys = require("sys"),
    events = require("events");


var out = function(s){sys.puts(s);};



function Dog(barkDb, name){
    this.name = name;
    this.barkDb = barkDb;
}

Dog.prototype = new events.EventEmitter();

Dog.prototype.barkAt = function(dog){
    out(this.name + " barks at " + dog.name +  ", decibell:" + this.barkDb);
    this.emit("barkAt", dog);
};

Dog.prototype.barkBack = function(dog){
    out(this.name + " barks back at " + dog.name + ", decibell:" + this.barkDb);
    this.emit("barkBack");
};

Dog.prototype.on("barkAt", function(dog){
    dog.barkBack(this);
});

var fido = new Dog(12, "fido");
var solo = new Dog(13, "solo");


solo.barkAt(fido);

