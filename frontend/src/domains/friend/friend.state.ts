import { IFriendshipDTO } from 'project-web-dev';
import { APIErrorInfo } from '../../../typings';

export interface FriendState {
	friends: IFriendshipDTO[];
	status: 'idle' | 'loading' | 'error',
	errorInfo?: APIErrorInfo
}

const userState: FriendState = {
	friends: [],
	status: 'idle',
};

export default userState;
