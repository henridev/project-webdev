/* eslint-disable @typescript-eslint/ban-types */
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { isJwtExpired } from 'jwt-check-expiration';
import { AppThunk } from '../../config/store';
import { login, register } from './auth.api';
import { getUserById } from '../user/user.api';
import { logoutUser } from './auth.slice';
import parseJwt from '../../shared/utils/parse-jwt';
import { storageKeys } from '../../config/localforage';
import getErrorInfo from '../../shared/utils/get-error-info';

const registerPayloadCreator: AsyncThunkPayloadCreator<any, any, any> = async (
	args: { username: string, email: string, password: string, avatarUrl: string, heroImage: object },
	{ rejectWithValue },
) => {
	try {
		const { password, ...newUser } = args;
		const { user, token } = await register(newUser, password);
		localStorage.setItem(storageKeys.user, JSON.stringify(user));
		localStorage.setItem(storageKeys.token, token);
		return { user, token };
	} catch (error) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const registerAsync = createAsyncThunk(
	'auth/register',
	registerPayloadCreator,
);

const loginPayloadCreator: AsyncThunkPayloadCreator<any, any, any> = async (
	info: { username: string, password: string }, { rejectWithValue },
) => {
	try {
		const { user, token } = await login(info.username, info.password);
		localStorage.setItem(storageKeys.user, JSON.stringify(user));
		localStorage.setItem(storageKeys.token, token);
		return { user, token };
	} catch (error) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const loginAsync = createAsyncThunk(
	'auth/login',
	loginPayloadCreator,
);

// simple thunk
export const logout = (): AppThunk => async (dispatch) => {
	localStorage.removeItem(storageKeys.token);
	dispatch(logoutUser());
};

const setupSessionPayloadCreator = async () => {
	const token = localStorage.getItem(storageKeys.token);
	const isValidToken = token && !isJwtExpired(token);

	if (isValidToken) {
		localStorage.setItem(storageKeys.token, token || '');
		const { userId } = parseJwt(token as string);
		if (userId) {
			const user = await getUserById(userId);
			localStorage.setItem(storageKeys.user, JSON.stringify(user));
			return { user, token };
		}
	}

	localStorage.removeItem(storageKeys.token);
	localStorage.removeItem(storageKeys.user);
	return { token: undefined, user: undefined };
};

export const setupSessionAsync = createAsyncThunk(
	'auth/setupSession',
	setupSessionPayloadCreator,
);
