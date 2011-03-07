
var sys = require("sys"),
    events = require("events"),
    http = require("http");

var l = function(s){
    sys.puts(s);
};

http.createServer(function(req, res){
    res.writeHead(200, {});
    res.write("yaaay");
    res.end();
}).listen(process.env.C9_PORT);

function Dog(barkDb, name){
    this.name = name;
    this.barkDb = barkDb;
}

Dog.prototype.emitter = new events.EventEmitter();

Dog.prototype.barkAt = function(dog){
    sys.puts(this.name + " barks at " + dog.name +  ", decibell:" + this.barkDb);
    this.emitter.emit("barkAt", dog);
};

Dog.prototype.barkBack = function(dog){
    sys.puts(this.name + " barks back at " + dog.name + ", decibell:" + this.barkDb);
    this.emitter.emit("barkBack", dog);
};

Dog.prototype.emitter.on("barkAt", function(dog){
    dog.barkBack(this);
});

Dog.prototype.emitter.on("barkBack", function(dog){
    sys.puts((this.barkDb > dog.barkDb ? this.name : dog.name) + " wins!");
});

var fido = new Dog(99, "fido");
var solo = new Dog(98, "solo");


solo.barkAt(fido);







