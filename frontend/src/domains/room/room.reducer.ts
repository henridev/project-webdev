/* eslint-disable consistent-return */
/* eslint-disable indent */
import produce from 'immer';
import { initialState } from './context/room.context';
import { RoomAction, RoomActions, RoomState } from './room.types';

// immer for mutable state
export const roomReducer = (state: RoomState, action: RoomAction): RoomState => {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case RoomActions.ADD_MESSAGE:
				draft.messages.push(payload);
				break;
			case RoomActions.ADD_INVITATION:
				draft.invites.push(payload);
				break;
			case RoomActions.CHANGE_ROOM_NAME:
				draft.room.name = (payload);
				break;
			case RoomActions.CREATE_ROOM:
				draft.room = payload;
				break;
			case RoomActions.JOIN_ROOM:
				draft.usersInCurrentRoom = draft.usersInCurrentRoom.filter((u) => u.id !== payload?.user?.id);
				draft.usersInCurrentRoom.push(payload.user);
				draft.messages.push(payload.message);
				break;
			case RoomActions.LEAVE_ROOM:
				draft = initialState;
				break;
			case RoomActions.USER_LEFT_ROOM:
				draft.usersInCurrentRoom = draft.usersInCurrentRoom.filter((u) => u.id !== payload?.user?.id);
				break;
			case RoomActions.SET_ONLINE_FRIENDS:
				draft.friendsOnline = (payload.friendsOnline);
				draft.usersInRooms = (payload.friendsInRooms);
				draft.usersInCurrentRoom = payload.usersInCurrentRoom.map((id: any) => ({ id }))
					|| draft.usersInCurrentRoom;
				break;
			case RoomActions.SET_GAME:
				draft.game = payload;
				break;
			case RoomActions.ADD_MEME:
				draft.meme = payload;
				break;
			default:
				return draft;
		}
	});
};
