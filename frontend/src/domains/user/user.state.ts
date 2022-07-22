import { IUser } from 'project-web-dev';
import { APIErrorInfo } from '../../../typings';

export interface UserState {
	users: IUser[];
	pickedUser?: IUser;
	status: 'idle' | 'loading' | 'error',
	errorInfo?: APIErrorInfo
}

const userState: UserState = {
	users: [],
	pickedUser: undefined,
	status: 'idle',
};

export default userState;
