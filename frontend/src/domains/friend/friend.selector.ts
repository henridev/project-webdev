import { IFriendshipDTO } from 'project-web-dev';
import { RootState } from '../../config/store';

export const selectFriends = (state: RootState): IFriendshipDTO[] => state.friend.friends;
