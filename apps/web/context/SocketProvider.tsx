"use client"
import React from 'react'
import { io, Socket } from 'socket.io-client'
 
interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string) => any;
}

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? 'localhost:8000';
const SocketContext = React.createContext<SocketContext | null>(null);

export const useSocket = () => {
  const state = React.useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket>()

    const sendMessage: SocketContext['sendMessage'] = React.useCallback((message) => {
      if(!socket) throw new Error('Socket is not connected');
        console.log('Sending message:', message)
        socket.emit('event:message', { message: message })
    }, [socket])
    
    React.useEffect(() => {
      const _socket = io(`http://${SOCKET_SERVER_URL}`)
      setSocket(_socket)
      return () => {
        _socket.disconnect();
        setSocket(undefined);
      };
    }, [])

  return (
    <SocketContext.Provider value={{sendMessage}}>
      {children}
    </SocketContext.Provider>
  )
}