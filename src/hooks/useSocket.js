import { useEffect, useRef } from 'react';
import { socketManager } from '../utils/socket';
import { useUser } from '../contexts/UserContext';

export const useSocket = () => {
  const { user } = useUser();
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token) {
        socketRef.current = socketManager.connect(token);
      }
    } else {
      socketManager.disconnect();
      socketRef.current = null;
    }

    return () => {
      if (socketRef.current) {
        socketManager.disconnect();
      }
    };
  }, [user]);

  return socketRef.current;
};

export default useSocket;