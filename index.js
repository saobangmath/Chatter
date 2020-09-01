const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

// configure the express server to listen on port 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/graph", (req, res) => {
    res.sendFile(__dirname + "/public/graph.html");
});

app.get("/ad-hoc", (req, res) => {
    res.sendFile(__dirname + "/public/ad-hoc.html");
})

app.get("/data-structure", (req, res) => {
    res.sendFile(__dirname + "/public/data structure.html");
})
// tech namespace
const tech = io.of("/tech");

tech.on("connection", (socket) =>{
   socket.on("join", (data) => {
        socket.join(data.room);
        tech.in(data.room).emit("message", `New user joined ${data.room} room!`);
   });

   socket.on("message", (data) =>{
       console.log(`message: ${data.msg}`);
       tech.in(data.room).emit("message", data.msg);
   }); 
   socket.on("disconnect", () => {
        tech.emit("message", "user disconnected");
   });
})