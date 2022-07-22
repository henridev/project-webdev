/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { Dispatch, MutableRefObject, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IRoom, IUserInfo, MySocket, RoomAction, RoomActions, RoomState } from '../room.types';
import { GAME_EP } from '../../../view/routes/endpoints';
import { storageKeys } from '../../../config/localforage';

export type EmissionHandler = {
	handleCreateRoom: (savedRoomId?: string) => void;
	handleRoomInvite: (user: IUserInfo) => void;
	handleJoinRoom: (room: IRoom) => void;
	handleLeaveRoom: () => void;
	handleCheckIfOnline: (friendList: string[]) => void;
	handleSendChatMessage: (message: string) => void;
	handleNewMeme: () => void
}

const useEmissionHandler = (
	s: MutableRefObject<MySocket | undefined>,
	dispatch: Dispatch<RoomAction>,
	roomState: RoomState,
): EmissionHandler => {
	const navigate = useNavigate();

	const handleCreateRoom = useCallback((savedRoomId?: string) => {
		const room = { name: roomState.room.name, id: savedRoomId || uuidv4() };
		s.current?.emit('room:create', room);
	}, [roomState.room.name]);

	const handleJoinRoom = useCallback((room: IRoom) => {
		s.current?.emit('room:join', room);
	}, []);

	const handleRoomInvite = useCallback((user: IUserInfo) => {
		s.current?.emit('room:invite', user, roomState.room);
	}, [roomState.room]);

	const handleLeaveRoom = useCallback(() => {
		localStorage.removeItem(storageKeys.room);
		s.current?.emit('room:leave');
		dispatch({ type: RoomActions.LEAVE_ROOM, payload: null });
		navigate(GAME_EP);
	}, []);

	const handleNewMeme = useCallback(() => {
		s.current?.emit('game:meme');
	}, []);

	const handleCheckIfOnline = useCallback((friendList: string[]) => {
		s.current?.emit('friends:online', friendList);
	}, []);

	const handleSendChatMessage = useCallback((message: string) => {
		s.current?.emit('chat:message', message);
	}, []);

	return {
		handleCreateRoom,
		handleRoomInvite,
		handleJoinRoom,
		handleLeaveRoom,
		handleCheckIfOnline,
		handleSendChatMessage,
		handleNewMeme,
	};
};

export default useEmissionHandler;
