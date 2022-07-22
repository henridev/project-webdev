import { Outlet } from 'react-router-dom';
import { FRIEND_EP } from '../routes/endpoints';
import FriendPage from './FriendPage';

const SharedWrapper = () => (
	<main>
		<Outlet />
	</main>
);

const FriendRoutes = {
	path: FRIEND_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <FriendPage /> },
	],
};

export default FriendRoutes;
