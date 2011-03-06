var sys = require("sys"),
    events = require("events"),
    http = require("http"),
    ws     = require("./vendor/ws"),
    base64 = require('./vendor/base64'),
    arrays = require('./vendor/arrays');


var clients = [];

var wserv = ws.createServer(function (websocket) {
  clients.push(websocket);

  websocket.addListener("connect", function (resource) {
    // emitted after handshake
    sys.debug("connect: " + resource);
  }).addListener("close", function () {
    // emitted when server or client closes connection
    clients.remove(websocket);
    sys.debug("close");
  }).addListener("data", function(data){
    clients.each(function(c){
        c.write(data);
    });
  });
}).listen(process.env.C9_PORT);



sys.puts(process.env.C9_PORT);
sys.puts(sys.inspect(wserv));