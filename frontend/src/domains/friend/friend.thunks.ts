import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { FriendStatus, IFriendshipDTO } from 'project-web-dev';
import { AppThunk } from '../../config/store';
import { addFriends, changeStatus } from './friend.slice';
import { createFriendship, findUserFriends, changeFriendStatus, deleteFriendShip } from './friend.api';
import getErrorInfo from '../../shared/utils/get-error-info';

export const getUserFriendsAsync = (filter?: Record<string, any>): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		const friends = await findUserFriends(filter);
		dispatch(addFriends(friends));
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const updateFriendStatusAsync = (friendshipId: string, status: FriendStatus): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		await changeFriendStatus(friendshipId, status);
		await dispatch(getUserFriendsAsync());
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const deleteFriendStatusAsync = (friendshipId: string): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		await deleteFriendShip(friendshipId);
		await dispatch(getUserFriendsAsync());
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

type CreateFriendRequestPayloadCreator = AsyncThunkPayloadCreator<IFriendshipDTO, string, Record<string, unknown>>

const createFriendRequestPayloadCreator: CreateFriendRequestPayloadCreator = async (
	username,
	{ rejectWithValue },
) => {
	try {
		const createdFriendship = await createFriendship(username);
		return createdFriendship;
	} catch (error: any) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const createFriendRequestAsync = createAsyncThunk(
	'friend/createFriendRequest',
	createFriendRequestPayloadCreator,
);
