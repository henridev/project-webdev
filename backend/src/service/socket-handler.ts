import { difference, find, intersection } from 'lodash'
import { addUserToRoom, getUserRoom, getUsersInRoom, getUsersInRoomByUserIds, removeUser } from './room-manager'
import { ClientToServerEvents, MySocket, MySocketServer } from '../create-socket'
import { getUserInfoFromSocket, getUsersFromSockets } from '../utils/socket.utils'
import { getChildLogger } from './logger'
import gameRepository from '../api/components/game/repository'
import { Game } from '../api/components/game/model'

const log = getChildLogger('socket')

interface SocketHandler<T> {
	(io: MySocketServer, socket: MySocket): T;
}



const createRoomHandler: SocketHandler<ClientToServerEvents['room:create']> = (io, socket) => async (room) => {
	const user = getUserInfoFromSocket(socket)
	addUserToRoom(room, user)
	socket.join(room.id)

	let game: Game
	game = await gameRepository.findGameByRoomId(room.id)
	if (!game) {
		game = await gameRepository.createGame(user.id, {
			roomId: room.id,
			creatorId: user.id
		})
	}

	// send to all clients in this room accept current one
	socket.broadcast.to(room.id).emit('room:joined', user, room, game)
	// send to current client
	socket.emit('room:created', room, game)
	// send to all clients in room
	io.to(room.id).emit('room:created', room, game)
}


const joinRoomHandler: SocketHandler<ClientToServerEvents['room:join']> = (io, socket) => async (room) => {
	const user = getUserInfoFromSocket(socket)
	const game = await gameRepository.findGameByRoomId(room.id)
	addUserToRoom(room, user)
	socket.join(room.id)
	// send to all in room
	io.to(room.id).emit('room:joined', user, room, game)
}

const newMemeHandler: SocketHandler<ClientToServerEvents['game:meme']> = (io, socket) => async () => {
	const user = getUserInfoFromSocket(socket)
	const room = getUserRoom(user.id)
	const game = await gameRepository.findGameByRoomId(room?.id || '')
	const meme = await gameRepository.addRandomMemeToGame(game.id)
	if (room?.id && user.id === game.creatorId) {
		io.to(room.id).emit('game:meme', meme.img_url, meme.name)
	}
}


const inviteRoomHandler: SocketHandler<ClientToServerEvents['room:invite']> = (io, socket) => async (invitee, room) => {
	const sockets = await io.fetchSockets()
	const userToInviteSocket = find(sockets, (s) => s.data.userId === invitee.id)
	const inviter = getUserInfoFromSocket(socket)
	userToInviteSocket?.emit('room:invite', inviter, room)
}

const leaveRoomHandler: SocketHandler<ClientToServerEvents['room:leave']> = (io, socket) => () => {
	const user = getUserInfoFromSocket(socket)
	const room = removeUser(user.id || '') // returns the room just left
	io.to(room.id).emit('room:leave', user)
}

const friendOnlineCheckHandler: SocketHandler<ClientToServerEvents['friends:online']> = (io, socket) => async (friends) => {
	const usersOnline = await getUsersFromSockets(io)
	// friends that are already online in a room
	const friendsInRooms = getUsersInRoomByUserIds(friends)
	const user = getUserInfoFromSocket(socket)
	const room = getUserRoom(user.id)
	const usersInCurrentRoom = getUsersInRoom(room?.id || '')
	// friends that are just online
	const friendsOnline = difference(intersection(friends, usersOnline), friendsInRooms)
	// send to current client
	socket.emit('friends:online', { friendsOnline, friendsInRooms, usersInCurrentRoom })
}

const chatMessageHandler: SocketHandler<ClientToServerEvents['chat:message']> = (io, socket) => (message) => {
	const sender = getUserInfoFromSocket(socket)
	const room = getUserRoom(socket.data.userId || '')
	if (room?.id) {
		io.to(room.id).emit('chat:message', message, sender)
	}
}

const disconnectHandler: SocketHandler<(reason: string) => void> = (io, socket) => (reason) => {
	log.debug(`client disconnect... ${socket.id} => reason ${reason}`)
	const user = getUserInfoFromSocket(socket)
	const room = removeUser(socket.data.userId || '')
	if (room.id) {
		io.to(room.id).emit('room:leave', user)
	} else {
		log.debug(`user ${user.name} was not in any room`)
	}
}

const pingHandler = (socket: MySocket): ClientToServerEvents['ping'] => () => {
	log.debug('received a ping')
	socket.emit('pong')
}

const errorHandler = (socket: MySocket): (err: Error) => void => (err) => {
	log.debug('error on socket:', socket.id)
	log.error(err)
}

const registerSocketHandlers = (io: MySocketServer, socket: MySocket) => {
	// receive  a client emitted message
	socket.on('room:create', createRoomHandler(io, socket))
	socket.on('room:join', joinRoomHandler(io, socket))
	socket.on('room:invite', inviteRoomHandler(io, socket))
	socket.on('room:leave', leaveRoomHandler(io, socket))
	socket.on('friends:online', friendOnlineCheckHandler(io, socket))
	socket.on('chat:message', chatMessageHandler(io, socket))
	socket.on('game:meme', newMemeHandler(io, socket))

	socket.on('ping', pingHandler(socket))

	// handle default events
	socket.on('disconnect', disconnectHandler(io, socket))
	socket.on('error', errorHandler(socket))
}



export default registerSocketHandlers