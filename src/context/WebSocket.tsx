import { useUser } from '@clerk/nextjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { isCallType, SocketUser } from '../../types/index'

interface MySocket{
  onlineUser:SocketUser[] | null,
  isCall: isCallType[] | null,
  socket:Socket | null
}

export const WebSocket = createContext<null | MySocket>(null)

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const {user} = useUser()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [onlineUser,setOnlineUser] = useState<SocketUser[] | null>(null);
  const [isCall,setIsCall] = useState<null | isCallType[]>(null)

  console.log("onlineUsers",onlineUser)
  useEffect(() => {
    if (!user) return;

    const newSocket = io();
    setSocket(newSocket)
    console.log(`connection ${isConnected}`)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return;

    if (socket.connected) {
      onConnect()
    }
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket])

  useEffect(()=>{
    if(!socket || !isConnected) return;
    socket.emit('addNewUser',user);
    socket.on('getUsers',(res)=>{
    setOnlineUser(res)
    })
    return ()=>{
      socket.off('getUsers',(res)=>{
      setOnlineUser(res)
    })
    }
  },[socket,isConnected,user])

  useEffect(()=>{
    if(!socket) return
    socket.on('sendMessage',(res)=>{
      setIsCall(res)
    })
    return ()=>{
      socket.off('sendMessage',res => {
        setIsCall(res)
      })
    }
  },[socket,setIsCall,isCall])

  useEffect

  return <WebSocket.Provider value={{onlineUser,isCall,socket}}>
    {children}
  </WebSocket.Provider>
}

export default WebSocketProvider


export const useSocket = () => {
  
  const context = useContext(WebSocket)
  if(context === null) {
    throw new Error("useSocket must be used in WebSocketProvider")
  }
  return context
}

export const useCallGoing = () => {
  const context = useContext(WebSocket);
  if (context === null) return;
  return context;
};