import { reduce } from 'lodash'
import { IUserInfo, MySocket, MySocketServer } from '../create-socket'

export const getUsersFromSockets = async (io: MySocketServer) => {
	const sockets = await io.fetchSockets()
	const usersOnline = reduce(sockets, (prev, s) => {
		if (s.data.userId) {
			prev.push(s.data.userId)
		}
		return prev
	}, [] as string[])
	return usersOnline
}

export const getUserInfoFromSocket = (socket: MySocket): IUserInfo => {
	return {
		id: socket.data.userId || '',
		name: socket.data.userName || ''
	} as IUserInfo
}