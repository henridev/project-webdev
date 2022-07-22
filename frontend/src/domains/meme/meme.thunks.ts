import { IMeme } from 'project-web-dev';
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../config/store';
import { addMemes, changeStatus } from './meme.slice';
import {
	createMeme,
	deleteMeme,
	getMemes,
} from './meme.api';
import getErrorInfo from '../../shared/utils/get-error-info';

export const getMemesAsync = (): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		const memes = await getMemes();

		dispatch(addMemes(memes));
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const deleteMemeAsync = (id: string): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		await deleteMeme(id);
		await dispatch(getMemesAsync());
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

const createMemePayloadCreator: AsyncThunkPayloadCreator<IMeme, IMeme, Record<string, unknown>> = async (
	meme: IMeme,
	{ rejectWithValue },
) => {
	try {
		const createdMeme = await createMeme(meme);
		return createdMeme;
	} catch (error: any) {
		return rejectWithValue(getErrorInfo(error));
	}
};

export const createMemeAsync = createAsyncThunk(
	'meme/createMeme',
	createMemePayloadCreator,
);
