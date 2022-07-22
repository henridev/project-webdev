import { FC, memo, ReactElement, useEffect } from 'react';
import { Box, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../domains/room/context/room.context';
import FriendList from '../friend/components/FriendList';
import LeaveRoom from './components/LeaveRoom';
import MemeViewer from './components/MemeViewer';
import Chat from './components/Chat';
import StartGame from './components/NewMeme';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux.hooks';
import { getUserFriendsAsync } from '../../domains/friend';
import { selectUser } from '../../domains/auth';

const GamePage: FC = (): ReactElement => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const { roomState } = useRoomContext();

	useEffect(() => {
		dispatch(getUserFriendsAsync());
	}, []);

	return <Container maxW="container.xl">
		<HStack mt={4} spacing={5}>
			{roomState.game.creatorId === user?.id && <StartGame />}
			<FriendList />
			<LeaveRoom />
		</HStack>
		<VStack p={4} spacing={5} justify="center" align="center" h="full" minH="70vh">
			<Heading textAlign="center">
				{t('game:game-page.title', { name: roomState.room.name })}
			</Heading>
			<MemeViewer />
			<Box bottom={2} left={2} position="absolute" minW="350px" w="30%" zIndex={99}>
				<Chat />
			</Box>
		</VStack>
	</Container>;
};

export default memo(GamePage);
