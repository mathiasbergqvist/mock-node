var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/health", (req, res) => {
    res.send("UP");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(msg){
        io.emit('Emitted message', msg);
    });
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});
