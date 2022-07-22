import { Center } from '@chakra-ui/layout';
import { Container, HStack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useEffect } from 'react';
import { selectFriends, getUserFriendsAsync } from '../../domains/friend';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux.hooks';
import FriendCard from './components/FriendCard';
import FriendRequestField from './components/FriendRequestField';

const FriendPage: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const friends = useAppSelector(selectFriends);

	useEffect(() => {
		dispatch(getUserFriendsAsync());
	}, []);

	return <Container maxW="container.xl" p={4}>
		<VStack>
			<Center bg="green.500" h="100px" color="white" px={8} rounded="md">
				<FriendRequestField />
			</Center>
			<HStack justify="center" align="center" spacing={8} wrap="wrap">
				{friends.map((friend) => <FriendCard key={friend.friendId} friend={friend} />)}
			</HStack>
		</VStack>
	</Container>;
};

export default FriendPage;
