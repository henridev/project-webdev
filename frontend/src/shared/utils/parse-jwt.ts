import { RoleEnum } from 'project-web-dev';

type JwtPayload = {
	userId: string,
	roles: RoleEnum[],
	iat: number,
	exp: number,
	aud: string, // 'memes.hogent.be'
	iss: string, // 'memes.hogent.be'
	sub: string // 'auth'
}

const parseJwt = (token: string): Partial<JwtPayload> => {
	const base64Url = token.split('.')[1];
	const payload = Buffer.from(base64Url, 'base64');
	const jsonPayload = payload.toString('ascii');
	return JSON.parse(jsonPayload);
};

export default parseJwt;
