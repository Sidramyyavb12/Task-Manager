import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize socket connection
      const newSocket = io('http://localhost:5000', {
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket connected:', newSocket.id);
        setConnected(true);
        // Join user-specific room
        newSocket.emit('join', user.id);
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setConnected(false);
      });

      newSocket.on('task:created', (task) => {
        console.log('New task created:', task);
        if (task.assignedTo._id === user.id) {
          toast.success(`New task assigned: ${task.title}`);
        }
      });

      newSocket.on('task:updated', (task) => {
        console.log('Task updated:', task);
        if (task.assignedTo._id === user.id || task.createdBy._id === user.id) {
          toast.info(`Task updated: ${task.title}`);
        }
      });

      newSocket.on('task:deleted', (data) => {
        console.log('Task deleted:', data);
        toast.info('A task has been deleted');
      });

      setSocket(newSocket);

      return () => {
        newSocket.emit('leave', user.id);
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  const value = {
    socket,
    connected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};