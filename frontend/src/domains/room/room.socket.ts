/* eslint-disable no-console */
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import { storageKeys } from '../../config/localforage';
import { MySocket } from './room.types';

const { REACT_APP_API_BASE_URL: SOCKET_URL = 'http://localhost:4000' } = process.env;

const addDefaultHandlers = (socket: MySocket) => {
	socket.on('connect', () => {
		console.info(`⚡ socket ${socket.id} connect`);
	});
};

export const getSocket = (): MySocket => {
	const token = localStorage.getItem(storageKeys.token);
	const options: Partial<ManagerOptions & SocketOptions> = token ? {
		query: { token },
		autoConnect: true,
	} : {};
	const socket = io(SOCKET_URL, options) as MySocket;
	addDefaultHandlers(socket);
	return socket;
};

export default getSocket;
