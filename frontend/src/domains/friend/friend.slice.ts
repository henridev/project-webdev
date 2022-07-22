import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriendshipDTO } from 'project-web-dev';
import { createFriendRequestAsync } from './friend.thunks';
import { APIErrorInfo } from '../../../typings';
import friendState from './friend.state';

export const friendSlice = createSlice({
	name: 'friend',
	initialState: friendState,
	reducers: {
		changeStatus: (state, action: PayloadAction<'loading' | 'idle' | 'error'>) => {
			state.status = action.payload;
		},
		addFriends: (state, action: PayloadAction<IFriendshipDTO[]>) => {
			state.friends = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createFriendRequestAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createFriendRequestAsync.fulfilled, (state, action) => {
				state.friends.push(action.payload);
				state.status = 'idle';
			})
			.addCase(createFriendRequestAsync.rejected, (state, action) => {
				state.errorInfo = action.payload as APIErrorInfo;
				state.status = 'error';
			});
	},
});

export const { addFriends, changeStatus } = friendSlice.actions;

const friendReducer = friendSlice.reducer;

export default friendReducer;
