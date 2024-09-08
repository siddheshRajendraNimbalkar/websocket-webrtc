'use client'

import WebSocketProvider from '@/context/WebSocket'
import React, { ReactNode } from 'react'

export const SocketProvides = ({children}:{children:ReactNode}) => {
  return (
   <WebSocketProvider>
        {children}
   </WebSocketProvider>
  )
}
