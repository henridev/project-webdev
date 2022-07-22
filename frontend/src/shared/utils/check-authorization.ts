import { RoleEnum } from 'project-web-dev';

const checkAuthorization = (
	userRoles: RoleEnum[] = [], requiredRoles: RoleEnum[] = [],
): boolean => {
	const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));
	return isAuthorized;
};

export default checkAuthorization;
