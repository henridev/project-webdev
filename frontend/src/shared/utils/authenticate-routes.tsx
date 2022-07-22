import { IUser, RoleEnum } from 'project-web-dev';
import { RouteObject, Navigate } from 'react-router-dom';
import { Loader } from '../../view/shared/components';
import checkAuthorization from './check-authorization';

const authenticateRoutes = (
	route: RouteObject,
	authorizedRoles: RoleEnum[],
	user?: IUser | null,
	isLoading?: boolean,
): RouteObject => {
	if (!user || !checkAuthorization(user.roles || [], authorizedRoles) || isLoading) {
		return { ...route, element: isLoading ? <Loader /> : <Navigate to="/" /> };
	}
	return route;
};

export default authenticateRoutes;
