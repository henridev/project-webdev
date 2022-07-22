import { IUser } from 'project-web-dev';
import { RootState } from '../../config/store';

export const selectUsers = (state: RootState): IUser[] => state.user.users;

export const selectPickedUser = (state: RootState): IUser | undefined => state.user.pickedUser;

/**
 * allows us to select a value from
 * the state. Selectors can also be defined inline where
 * they're used instead of in the slice file.
 * For example: `useSelector((state: RootState) => state.counter.value)`
*/
