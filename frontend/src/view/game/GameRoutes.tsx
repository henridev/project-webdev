import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { GAME_EP } from '../routes/endpoints';
import GameCreationPage from './GameCreationPage';
import GamePage from './GamePage';

const SharedWrapper = () => (
	<Container maxW="container.xl" h="full">
		<Outlet />
	</Container>
);

const GameRoutes = {
	path: GAME_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <GameCreationPage /> },
		{ path: ':roomId', element: <GamePage /> },
	],
};

export default GameRoutes;
