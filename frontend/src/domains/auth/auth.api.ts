import { IUser } from 'project-web-dev';
import api from '../../config/network';

const prefix = 'auth';

type AuthRes = {
	token: string,
	user: IUser
}

export const register = async (user: Omit<IUser, 'id'>, password: string): Promise<AuthRes> => {
	const formData = new FormData();
	formData.append('password', password);
	Object.entries(user).forEach(([k, v]) => formData.append(k, v as any));
	const res = await api.post(`${prefix}/register`, {
		body: formData,
	});
	return res.json();
};

export const login = async (username: string, password: string): Promise<AuthRes> => {
	const res = await api.post(`${prefix}/login`, { json: { username, password } });
	return res.json();
};

export const checkToken = async (): Promise<{ user?: IUser, connected: boolean }> => {
	const res = await api.get(`${prefix}/status`);
	return res.json();
};
