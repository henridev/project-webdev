/* eslint-disable no-console */
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useTimeout } from '../../../shared/hooks';
import { IRoom, IUserInfo, MySocket, RoomState } from '../room.types';

export type EmissionHandler = {
	handleCreateRoom: (savedRoomId?: string) => void;
	handleRoomInvite: (user: IUserInfo) => void;
	handleJoinRoom: (room: IRoom) => void;
	handleLeaveRoom: () => void;
	handleCheckIfOnline: (friendList: string[]) => void;
	handleSendChatMessage: (message: string) => void;
}

const SOCKET_CONNECTION_RETRY_TIMEOUT = 10000;

const useAutoRoomJoin = (
	s: MutableRefObject<MySocket | undefined>,
	roomState: RoomState,
	handleCreateRoom: EmissionHandler['handleCreateRoom'],
	setSocket: () => void,
): void => {
	useEffect(() => {
		if (s.current && roomState.room.id) {
			// create or join the room saved room
			handleCreateRoom(roomState.room.id);
		}
	}, [s.current]);

	const retrySocketConnection = useCallback(
		() => {
			setSocket();
		},
		[s.current],
	);

	useTimeout(retrySocketConnection, SOCKET_CONNECTION_RETRY_TIMEOUT);
};

export default useAutoRoomJoin;
