/* eslint-disable no-console */
import { createContext, FC, ReactElement, useContext, useEffect, useReducer, useRef } from 'react';
import { IRoomContext, MySocket, RoomState } from '../room.types';
import { roomReducer } from '../room.reducer';
import { getStoredJSON, storageKeys } from '../../../config/localforage';
import getSocket from '../room.socket';
import useReceptionHandler from './useReceptionHandler';
import useEmissionHandler from './useEmissionHandler';
import useAutoRoomJoin from './useAutoRoomJoin';
import useFriendStatusCheck from './useFriendStatusCheck';

export const initialState: RoomState = {
	messages: [],
	friendsOnline: [],
	usersInRooms: [],
	usersInCurrentRoom: [],
	meme: { memeUrl: '', memeName: '' },
	invites: [],
	game: {},
	room: getStoredJSON(storageKeys.room) || { id: '', name: '' },
};

export const RoomContext = createContext<IRoomContext | null>(null);

export const RoomContextProvider: FC = (props): ReactElement => {
	const socketRef = useRef<MySocket>();
	const [roomState, dispatch] = useReducer(roomReducer, initialState);
	const { children } = props;
	const { registerHandlers } = useReceptionHandler(socketRef, dispatch, roomState);

	const {
		handleCreateRoom,
		handleRoomInvite,
		handleJoinRoom,
		handleLeaveRoom,
		handleCheckIfOnline,
		handleSendChatMessage,
		handleNewMeme,
	} = useEmissionHandler(socketRef, dispatch, roomState);

	const setSocket = () => {
		if (!socketRef.current?.connected) {
		// set socket if undefined
			socketRef.current = getSocket();
			// set server emission handlers
			registerHandlers();
		}
	};

	useAutoRoomJoin(socketRef, roomState, handleCreateRoom, setSocket);
	useFriendStatusCheck(handleCheckIfOnline);

	useEffect(() => {
		setSocket();
		return () => {
			if (socketRef.current) {
				// unsub from emission & close connection
				console.log(`🛑 disconnect socket ${socketRef.current?.id}`);
				socketRef.current.close();
			}
		};
	}, []);

	return <RoomContext.Provider value={{
		handleCreateRoom,
		handleCheckIfOnline,
		handleLeaveRoom,
		handleRoomInvite,
		handleJoinRoom,
		handleSendChatMessage,
		handleNewMeme,
		roomState,
		dispatch,
	}}
	>
		{children}
	</RoomContext.Provider>;
};

export const WithRoomContextProvider: FC<{isSignedIn: boolean}> = (props): ReactElement => {
	const { isSignedIn, children } = props;
	return isSignedIn ? <RoomContextProvider>
		{children}
	</RoomContextProvider> : <>{children}</>;
};

export const useRoomContext = (): IRoomContext => useContext(RoomContext) as IRoomContext;
