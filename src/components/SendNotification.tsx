'use client'

import { useSocket } from '@/context/WebSocket';
import { useUser } from '@clerk/nextjs';
import React from 'react';
 // Import your socket provider

const SendNotification = () => {
  const { onlineUser,socket } = useSocket(); 
  const {user} = useUser()
  const handleSendNotification = () => {
    const senderId = user?.id
    const senderName = user?.firstName

    if (onlineUser) {
      
      onlineUser.forEach(user => {
        if (user.userId === senderId) {
            if(socket == null){
                return
            }
          senderName == null ? socket.emit('sender', user.userId, senderName,user.profile.imageUrl) : socket.emit('sender', user.userId, "Anonymous");
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleSendNotification}>
        Send Notification
      </button>
    </div>
  );
};

export default SendNotification;
