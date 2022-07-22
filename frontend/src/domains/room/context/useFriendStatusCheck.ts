/* eslint-disable no-console */

import { useAppSelector } from '../../../shared/hooks/redux.hooks';
import { useInterval } from '../../../shared/hooks';
import { selectFriends } from '../../friend';

const useFriendStatusCheck = (handleCheckIfOnline: (friendList: string[]) => void): void => {
	const friends = useAppSelector(selectFriends);
	useInterval(() => {
		handleCheckIfOnline(friends.map((f) => f.userId));
	}, 10000);
};

export default useFriendStatusCheck;
