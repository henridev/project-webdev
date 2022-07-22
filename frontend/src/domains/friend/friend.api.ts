import { IFriendshipDTO, FriendStatus } from 'project-web-dev';
import api from '../../config/network';

const prefix = 'friend';

export const findUserFriends = async (filter?: Record<string, any>): Promise<IFriendshipDTO[]> => {
	const res = await api.get(prefix, { searchParams: filter });
	return res.json();
};

export const changeFriendStatus = async (friendShipId: string, status: FriendStatus): Promise<void> => {
	const res = await api.patch(`${prefix}/${friendShipId}`, { json: { status } });
	return res.json();
};

export const deleteFriendShip = async (friendShipId: string): Promise<boolean> => {
	const res = await api.delete(`${prefix}/${friendShipId}`);
	return res.status === 204;
};

export const createFriendship = async (username: string): Promise<IFriendshipDTO> => {
	const res = await api.post(prefix, { json: { username } });
	return res.json();
};
