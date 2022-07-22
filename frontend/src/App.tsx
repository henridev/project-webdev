import { ReactElement, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { RoleEnum } from 'project-web-dev';
import { useAppDispatch, useAppSelector } from './shared/hooks/redux.hooks';
import { setupSessionAsync } from './domains/auth/auth.thunks';
import { NavBar } from './view/shared/components';
import { UserRoutes } from './view/user';
import { GameRoutes } from './view/game';
import { FriendRoutes } from './view/friend';
import { MemeRoutes } from './view/meme';
import { selectUser } from './domains/auth';
import { LandingPage, NotFoundPage } from './view/shared';
import { WithRoomContextProvider } from './domains/room/context/room.context';
import authenticateRoutes from './shared/utils/authenticate-routes';

const App = (): ReactElement => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const element = useRoutes([
		{ path: '/', element: <LandingPage /> },
		authenticateRoutes(MemeRoutes, [RoleEnum.ADMIN], user),
		authenticateRoutes(GameRoutes, [RoleEnum.ADMIN, RoleEnum.USER], user),
		authenticateRoutes(UserRoutes, [RoleEnum.ADMIN, RoleEnum.USER], user),
		authenticateRoutes(FriendRoutes, [RoleEnum.ADMIN, RoleEnum.USER], user),
		{ path: '/404', element: <NotFoundPage /> },
	]);

	useEffect(() => {
		dispatch(setupSessionAsync());
	}, []);

	return (
		<WithRoomContextProvider isSignedIn={!!user?.username}>
			<NavBar />
			{element}
		</WithRoomContextProvider>
	);
};

export default App;
