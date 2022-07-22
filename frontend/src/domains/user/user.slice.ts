import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'project-web-dev';
import { createUserAsync, updateFullUserAsync } from './user.thunks';
import userState from './user.state';
import { APIErrorInfo } from '../../../typings';

export const userSlice = createSlice({
	name: 'user',
	initialState: userState,
	reducers: {
		changeStatus: (state, action: PayloadAction<'loading' | 'idle' | 'error'>) => {
			state.status = action.payload;
		},
		addUsers: (state, action: PayloadAction<IUser[]>) => {
			state.users = action.payload;
		},
		pickUser: (state, action: PayloadAction<string>) => {
			state.pickedUser = state.users.find(({ id }) => id === action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.users = state.users.filter(({ id }) => id !== action.payload.id);
				state.users.push(action.payload);
				state.status = 'idle';
			})
			.addCase(createUserAsync.rejected, (state, action) => {
				state.errorInfo = action.payload as APIErrorInfo;
				state.status = 'error';
			});
		builder
			.addCase(updateFullUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateFullUserAsync.fulfilled, (state, action) => {
				state.users = state.users.filter(({ id }) => id !== action.payload.id);
				state.users.push(action.payload);
				state.status = 'idle';
			})
			.addCase(updateFullUserAsync.rejected, (state, action) => {
				state.errorInfo = action.payload as APIErrorInfo;
				state.status = 'error';
			});
	},
});

export const { addUsers, changeStatus, pickUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
