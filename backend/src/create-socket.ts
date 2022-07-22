import { Server as SocketServer, Socket } from 'socket.io'
import { Server } from 'http'
import { logger } from './service/logger'
import registerSocketHandlers from './service/socket-handler'
import socketServerOptions from './config/socket'
import socketJwtMiddleware from './api/middleware/socket-jwt'
import { Game } from './api/components/game/model'

export interface IRoom { id: string, name: string }
export interface IUserInfo { id: string, name: string }

export interface ServerToClientEvents {
	pong: () => void;
	['friends:online']: (onlineInfo: { friendsOnline: string[], friendsInRooms: string[], usersInCurrentRoom: string[] }) => void,
	['chat:message']: (message: string, sender: IUserInfo) => void,
	['room:created']: (room: IRoom, game: Game) => void
	['room:invite']: (inviter: IUserInfo, room: IRoom) => void
	['room:joined']: (user: IUserInfo, room: IRoom, game: Game) => void
	['room:leave']: (user: IUserInfo) => void
	['game:meme']: (memeurl: string, memeName: string) => void
}

export interface ClientToServerEvents {
	ping: () => void;
	['friends:online']: (friendIds: string[]) => void,
	['chat:message']: (message: string) => void,
	['room:create']: (room: IRoom) => void
	['room:invite']: (invitee: IUserInfo, room: IRoom) => void
	['room:join']: (room: IRoom) => void
	['room:leave']: () => void
	['game:meme']: () => void
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	userId: string;
	userName: string
}

export type MySocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
export type MySocketServer = SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>


const createSocket = (server: Server) => {
	const io = new SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, socketServerOptions)
	io.on('connection', (socket) => {
		logger.info(`Connection opened total connections ${io.engine.clientsCount}`)
		registerSocketHandlers(io, socket)
	})
	io.use(socketJwtMiddleware)
	return io
}


export default createSocket