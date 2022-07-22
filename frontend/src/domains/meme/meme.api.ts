import { IMeme } from 'project-web-dev';
import api from '../../config/network';

const prefix = 'meme';

export const getMemes = async (): Promise<IMeme[]> => {
	const res = await api.get(prefix);
	return res.json();
};

export const createMeme = async (meme: IMeme): Promise<IMeme> => {
	const formData = new FormData();
	Object.entries(meme).forEach(([k, v]) => formData.append(k, v as any));
	const res = await api.post(prefix, { body: formData });
	return res.json();
};

export const deleteMeme = async (id: string): Promise<boolean> => {
	const res = await api.delete(`${prefix}/${id}`);
	return res.status === 204;
};
