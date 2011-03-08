var sys = require("sys"),
    events = require("events"),
    http = require("http"),
    ws     = require("./vendor/node-websocket-server"),
    fs = require("fs");

//handy shorthand for insepction objects
Object.prototype.inspect = function(){
    sys.puts(sys.inspect(this));
};

//Initlializing server
var wsServer = ws.createServer(function(){
    
});

wsServer.on("request", function(req,res){
    res.writeHead(200, {});
    var page;
    fs.readFile(__dirname+"/chatClient.html", function(err, data) {
        sys.puts(err || data);
        page = err || data;
        res.write(page);
        res.end();
    });
});

wsServer.on("connection", function(con){
    sys.puts("user has connected with conection id: " + con.id);
    con.on("message", function(message){
        wsServer.broadcast(message);
    });
});

wsServer.listen(process.env.C9_PORT);

sys.puts(" websocket and http server is running on port:"+process.env.C9_PORT);