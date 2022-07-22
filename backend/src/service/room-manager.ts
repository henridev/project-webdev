import { IRoom, IUserInfo } from '../create-socket'
import { getChildLogger } from './logger'

const log = getChildLogger('manage rooms')

const users = new Map<string, IRoom>()

export const addUserToRoom = (room: IRoom, user: IUserInfo): IRoom => {
	const hasUser = users.has(user.id)
	if (hasUser) {
		log.error('user already in a room')
	}
	if (!room.id || !room.name) {
		log.error('no room name or id provided')
	}
	users.set(user.id, room)
	return room
}

export const getUserRoom = (userId: string): IRoom | void => {
	const room = users.get(userId)
	if (!room) {
		log.error('user has no room')
	}
	return room
}

export const removeUser = (userId: string): IRoom => {
	const room = { ...users.get(userId) } as IRoom
	if (room) {
		const wasDeleted = users.delete(userId)
		if (!wasDeleted) {
			log.error('user was not found for delete')
		}
	}
	log.debug(`removed user ${userId}`)
	return room
}

export const getUsersInRoom = (roomId: string): string[] => {
	return [...users].filter(([, v]) => v.id === roomId).map(([id]) => id)
}

export const getUsersInRoomByUserIds = (userIds: string[]): string[] => {
	return userIds.filter(id => users.has(id))
}

export const checkIfRoomExists = (roomId: string): boolean => {
	return [...users].some(([, v]) => v.id === roomId)
}