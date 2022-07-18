require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/messages',require('./routes/messageRoutes'))
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors: {origin: "*"}});
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res=>{
    console.log("DB connected");
}).catch(err=>{
    console.log(err.message);
})
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

global.onlineUsers=new Map();

io.on("connection", socket => {
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on('send-msg',(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        console.log("msg recieved")
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('receive-msg',data);
        }
    })
})
