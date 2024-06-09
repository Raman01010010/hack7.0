const { Server } = require("socket.io");
const allowedOrigin = require('./config/allowedOrigin');

let io;

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

function initSocket(server) { 
    io = new Server(server, {
      cors: {
        origin: allowedOrigin
      }
    });
   
    io.on('connection', (socket) => {
  
       socket.on("newUser", async({email}) => {
           console.log(`User ${socket.id} connected`);
           addNewUser(email, socket.id);
           console.log("i am array ",onlineUsers);
       });
     
       
       socket.on('RequestingToAuth',async({imgurl,email,receiveremail})=>{
       
            const receiver = getUser(receiveremail);
            console.log("aaya mai" , email,"  ",imgurl);
            console.log("fgff",receiver);
            if (receiver) {
                console.log(`Sending notification to ${receiveremail}`);
               
              }
              io.emit('getNotification', {
                imgurl,
                email,
              });
       })

       socket.on('accepted',async({email})=>{  
        const receiver = getUser(email);
        console.log("i am accepted",receiver);
        if(receiver){
          io.emit('acceptedNotf',{
            email
          }); 
        }
       })

       socket.on('rejected',async({email})=>{  
        const receiver = getUser(email);
        console.log("i am rejected",receiver);
        if(receiver){
          io.emit('rejectedNotf',{
            email
          }); 
        }
       })

    });
  }

function getIo() {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
  
    return io;
}
  
  module.exports = {
    initSocket,
    getIo,
  };