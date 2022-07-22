import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMeme } from 'project-web-dev';
import { createMemeAsync } from './meme.thunks';
import { APIErrorInfo } from '../../../typings';
import memeState from './meme.state';

export const memeSlice = createSlice({
	name: 'meme',
	initialState: memeState,
	reducers: {
		changeStatus: (state, action: PayloadAction<'loading' | 'idle' | 'error'>) => {
			state.status = action.payload;
		},
		addMemes: (state, action: PayloadAction<IMeme[]>) => {
			state.memes = action.payload;
		},
		pickMeme: (state, action: PayloadAction<string>) => {
			state.pickedMeme = state.memes.find(({ id }) => (id || '') === action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createMemeAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createMemeAsync.fulfilled, (state, action) => {
				state.memes = state.memes.filter(({ id }) => id !== action.payload.id);
				state.memes.push(action.payload);
				state.status = 'idle';
			})
			.addCase(createMemeAsync.rejected, (state, action) => {
				state.errorInfo = action.payload as APIErrorInfo;
				state.status = 'error';
			});
	},
});

export const { addMemes, changeStatus, pickMeme } = memeSlice.actions;
const memeReducer = memeSlice.reducer;
export default memeReducer;
