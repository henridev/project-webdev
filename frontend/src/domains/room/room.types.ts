import { IUser } from 'project-web-dev';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import { EmissionHandler } from './context/useEmissionHandler';

export interface IMessage {
	text: string
	type: 'chat' | 'join' | 'leave' | 'created'
	sender: string
}

export interface IRoom { id: string, name: string }
export interface IUserInfo { id: string, name: string }
export interface Game {
	id: string,
	roomId: string,
	updatedAt: string
	createdAt: string
	creatorId: string
}

export interface ServerToClientEvents {
	pong: () => void;
	['friends:online']: (onlineInfo:
		{ friendsOnline: string[], friendsInRooms: string[], usersInCurrentRoom: string[] }) => void,
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

export interface IRoomContext extends EmissionHandler {
	socket?: Socket,
	roomState: RoomState,
	dispatch: Dispatch<RoomAction>
}

export type MySocket = Socket<ServerToClientEvents, ClientToServerEvents>

export enum RoomActions {
	MESSAGE = 'MESSAGE',
	CREATE_ROOM = 'CREATE_ROOM',
	LEAVE_ROOM = 'LEAVE_ROOM',
	JOIN_ROOM = 'JOIN_ROOM',
	USER_LEFT_ROOM = 'USER_LEFT_ROOM',
	CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME',
	SET_ONLINE_FRIENDS = 'SET_ONLINE_FRIENDS',
	ADD_INVITATION = 'ADD_INVITATION',
	ADD_MESSAGE = 'ADD_MESSAGE',
	SET_GAME = 'SET_GAME',
	ADD_MEME = 'ADD_MEME',
}

// An interface for our actions
export interface RoomAction {
	type: RoomActions;
	payload: any;
}

// An interface for our state
export interface RoomState {
	room: IRoom
	messages: IMessage[]
	meme: { memeName: string, memeUrl: string }
	invites: { room: IRoom, inviter: IUser }[],
	friendsOnline: string[]
	usersInRooms: string[]
	usersInCurrentRoom: IUser[],
	game: Partial<Game>
}
