import { IUser } from 'project-web-dev';
import { storageKeys } from '../../config/localforage';

const currentUser = localStorage.getItem(storageKeys.user);

export interface AuthState {
	user?: IUser | null;
	token?: string | null,
	status: 'idle' | 'loading' | 'error',
}

const authState: AuthState = {
	user: currentUser ? JSON.parse(currentUser) : null,
	status: 'idle',
};

export default authState;
