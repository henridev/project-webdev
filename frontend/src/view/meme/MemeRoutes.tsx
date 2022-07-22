import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MEME_EP } from '../routes/endpoints';
import MemePage from './MemePage';

const SharedWrapper = () => (
	<Container maxW="container.xl" p={0}>
		<Outlet />
	</Container>
);

const UserRoutes = {
	path: MEME_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <MemePage /> },
	],
};

export default UserRoutes;
