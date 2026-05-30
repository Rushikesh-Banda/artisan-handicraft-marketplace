import { io } from 'socket.io-client';

// In production, this should be the deployed backend URL
const SOCKET_URL =
  "https://artisan-handicraft-marketplace.onrender.com";
let socket;

export const initiateSocketConnection = () => {
  socket = io(SOCKET_URL);
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToNotifications = (cb) => {
  if (!socket) return;
  socket.on('receiveNotification', (notification) => {
    return cb(null, notification);
  });
};

export const joinRoom = (userId) => {
  if (socket && userId) {
    socket.emit('join', userId);
  }
};
