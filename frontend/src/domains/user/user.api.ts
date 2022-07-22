import { IUser } from 'project-web-dev';
import api from '../../config/network';

const prefix = 'user';

export interface PaginationOptions {
	limit: string,
	offset: string,
	order?: 'ASC' | 'DESC'
}

export const getUsers = async (): Promise<IUser[]> => {
	const res = await api.get(prefix);
	return res.json();
};

// optional server side pagination
export const getUsersPaginated = async (options: PaginationOptions = {
	limit: '10',
	offset: '0',
	order: 'DESC',
}): Promise<IUser[]> => {
	const searchParams = new URLSearchParams(options as any);
	const res = await api.get(prefix, { searchParams });
	return res.json();
};

export const deleteUser = async (id: string): Promise<boolean> => {
	const res = await api.delete(`${prefix}/${id}`);
	return res.status === 204;
};

export const updateUser = async (id: string, user: Partial<IUser>): Promise<IUser> => {
	const res = await api.patch(`${prefix}/${id}`, { json: { ...user } });
	return res.json();
};

export const updateFullUser = async (user: IUser): Promise<IUser> => {
	const res = await api.put(`${prefix}/${user.id}`, { json: user });
	return res.json();
};

export const createUser = async (user: IUser): Promise<IUser> => {
	const res = await api.post(prefix, { json: user });
	return res.json();
};

export const getUserById = async (id: string): Promise<IUser> => {
	const res = await api.get(`${prefix}/${id}`);
	return res.json();
};
