import { createSlice } from '@reduxjs/toolkit';
import { setupSessionAsync, loginAsync, registerAsync } from './auth.thunks';
import authState from './auth.state';

export const authSlice = createSlice({
	name: 'auth',
	initialState: authState,
	reducers: {
		logoutUser: (state) => {
			state.token = null;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(registerAsync.fulfilled, (state, action) => {
				state.user = action.payload.user;

				state.status = 'idle';
			})
			.addCase(registerAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(loginAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.status = 'idle';
			})
			.addCase(loginAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(setupSessionAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(setupSessionAsync.fulfilled, (state, action) => {
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(setupSessionAsync.rejected, (state) => {
				state.status = 'error';
			});
	},
});

// Define a thunk that dispatches those action creators

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
