import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
console.log("HELLO")
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  let onlineUser = []
  let userSender = []

  io.on("connection", (socket) => {
    socket.on('addNewUser',(clerUser)=>{
        clerUser && !onlineUser.some((user)=>{  user?.userId === clerUser.id }) && onlineUser.push({
          userId:clerUser.id,
          socketId:socket.id, 
          profile:clerUser
        })
        io.emit('getUsers',onlineUser)
    })

    socket.on('sender', (UserId, name,imageUrl) => {
      if (UserId && !userSender.some((user) => user.UserId === UserId)) {
          userSender.push({
            senderName: name,
              UserId: UserId,
              imageUrl:imageUrl
          });
      }
      io.emit('sendMessage', userSender);
  });

    socket.on('disconnect',()=>{
      onlineUser = onlineUser.filter(user => user.socketId !== socket.id)
      io.emit('getUsers', onlineUser)
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});