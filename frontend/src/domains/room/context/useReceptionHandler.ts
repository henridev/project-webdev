/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { Dispatch, MutableRefObject, useCallback } from 'react';
import { merge } from 'lodash';
import { IMessage, MySocket, RoomAction, RoomActions, RoomState } from '../room.types';
import { GAME_EP } from '../../../view/routes/endpoints';
import { setStoredJSON, storageKeys } from '../../../config/localforage';
import { getUserById } from '../../user/user.api';

type UseReceptionHandler = (
	s: MutableRefObject<MySocket | undefined>,
	dispatch: Dispatch<RoomAction>,
	roomState: RoomState
) => { registerHandlers: () => void }

const useReceptionHandler: UseReceptionHandler = (s, dispatch, roomState) => {
	const navigate = useNavigate();

	const handleRoomCreation = useCallback(() => {
		s.current?.on('room:created', (room, game) => {
			dispatch({ type: RoomActions.CREATE_ROOM, payload: room });
			dispatch({ type: RoomActions.SET_GAME, payload: game });
			navigate(`${GAME_EP}/${room.id}`);
		});
	}, [s.current]);

	const handleRoomInvitation = useCallback(() => {
		s.current?.on('room:invite', async (inviter, room) => {
			const user = await getUserById(inviter.id);
			dispatch({ type: RoomActions.ADD_INVITATION, payload: { inviter: merge(user, inviter), room } });
		});
	}, [s.current]);

	const handleNewMemeReceived = useCallback(() => {
		s.current?.on('game:meme', async (memeUrl, memeName) => {
			dispatch({ type: RoomActions.ADD_MEME, payload: { memeUrl, memeName } });
		});
	}, [s.current]);

	const handleRoomJoined = useCallback(() => {
		s.current?.on('room:joined', async (user, room, game) => {
			setStoredJSON(storageKeys.room, room);
			const message: IMessage = { text: 'joined the room', type: 'join', sender: user.name };
			dispatch({ type: RoomActions.JOIN_ROOM, payload: { message, user } });
			dispatch({ type: RoomActions.SET_GAME, payload: game });
			navigate(`${GAME_EP}/${room.id}`);
		});
	}, [s.current]);

	const handleUserLeftRoom = useCallback(() => {
		s.current?.on('room:leave', (user) => {
			const messageInfo: IMessage = { text: 'left the room', type: 'leave', sender: user.name };
			dispatch({ type: RoomActions.ADD_MESSAGE, payload: messageInfo });
			dispatch({ type: RoomActions.USER_LEFT_ROOM, payload: user.id });
		});
	}, [s.current]);

	const handleOnlineCheck = useCallback(() => {
		s.current?.on('friends:online', (onlineInfo) => {
			dispatch({ type: RoomActions.SET_ONLINE_FRIENDS, payload: onlineInfo });
		});
	}, []);

	const handleMessageReception = useCallback(() => {
		s.current?.on('chat:message', (message, sender) => {
			const messageInfo: IMessage = { text: message, type: 'chat', sender: sender.name };
			dispatch({ type: RoomActions.ADD_MESSAGE, payload: messageInfo });
		});
	}, [roomState.room.name]);

	const registerHandlers = () => {
		handleRoomCreation();
		handleRoomInvitation();
		handleUserLeftRoom();
		handleOnlineCheck();
		handleRoomJoined();
		handleMessageReception();
		handleNewMemeReceived();
	};

	return {
		registerHandlers,
	};
};

export default useReceptionHandler;
