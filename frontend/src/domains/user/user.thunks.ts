/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { IUser } from 'project-web-dev';
import { AppThunk } from '../../config/store';
import { addUsers, changeStatus } from './user.slice';
import {
	createUser,
	deleteUser,
	getUsers,
	getUsersPaginated,
	PaginationOptions,
	updateFullUser,
} from './user.api';
import getErrorInfo from '../../shared/utils/get-error-info';

export const getUsersAsync = (paginationOptions?: PaginationOptions): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		const users = (paginationOptions)
			? await getUsersPaginated(paginationOptions)
			: await getUsers();

		dispatch(addUsers(users));
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const deleteUserAsync = (id: string): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		await deleteUser(id);
		await dispatch(getUsersAsync());
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

const createUserPayloadCreator: AsyncThunkPayloadCreator<IUser, IUser, Record<string, unknown>> = async (
	user: IUser,
	{ rejectWithValue },
) => {
	try {
		const createdUser = await createUser(user);
		return createdUser;
	} catch (error: any) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const createUserAsync = createAsyncThunk(
	'user/createUser',
	createUserPayloadCreator,
);

const updateFullUserPayloadCreator: AsyncThunkPayloadCreator<IUser, IUser, Record<string, unknown>> = async (
	user: IUser,
	{ rejectWithValue },
) => {
	try {
		const updatedUser = await updateFullUser(pick(user, ['username', 'email', 'avatarUrl', 'id']));

		return updatedUser;
	} catch (error: any) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const updateFullUserAsync = createAsyncThunk(
	'user/updateFullUser',
	updateFullUserPayloadCreator,
);
