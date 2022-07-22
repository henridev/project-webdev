import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { USER_EP } from '../routes/endpoints';
import UserPage from './UserPage';

const SharedWrapper = () => (
	<Container maxW="container.xl" p={0}>
		<Outlet />
	</Container>
);

const UserRoutes = {
	path: USER_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <UserPage /> },
	],
};

export default UserRoutes;
