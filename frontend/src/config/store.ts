import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from '../domains/auth/auth.slice';
import friendReducer from '../domains/friend/friend.slice';
import memeReducer from '../domains/meme/meme.slice';
import userReducer from '../domains/user/user.slice';

/**
 * setup the initial store with optionaly
 * multiple reducers per domain
 */
export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		friend: friendReducer,
		meme: memeReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
