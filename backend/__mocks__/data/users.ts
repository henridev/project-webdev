import { RoleEnum, UserDB } from '../../src/api/components/user/model'

export const DEFAULT_PASS = 'admin'
export const password_hash = '$argon2id$v=19$m=131072,t=6,p=1$LaLUqY2oIyKYPJQaMst3MA$WsPrOyJaNtBoellaE4qgcqCjCHq2C7qseex/uKkBMhU'

export const ADMIN: UserDB = {
	id: '030a6265-7209-463a-b290-c2dac24a7c95',
	username: 'admin', email: 'admin@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg', roles: (JSON.stringify([RoleEnum.ADMIN]))
}


export const TEST_USER = {
	id: '030a62e4-7209-463a-b290-c2dac24a7c95', username: 'user', email: 'user@mail.com', password_hash, avatar_url: 'x'
}

export const regularUsers: UserDB[] = [
	{ id: '1db6de50-0135-457f-9666-2259746d7b07', username: 'user-1', email: 'user-1@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
	{ id: 'faf58ad7-e561-4d36-8b4d-f684b30ad155', username: 'user-2', email: 'user-2@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
	{ id: 'b9c33670-9c00-46aa-b1dd-b4f0fc812818', username: 'user-3', email: 'user-3@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
	{ id: 'b2f74ca2-a3c9-469b-ba45-b9332e9a8c93', username: 'user-4', email: 'user-4@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
	{ id: 'c139d615-6a7b-4b98-a037-85b21b6f6b53', username: 'user-5', email: 'user-5@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
	{ id: 'eb26d386-bf0e-4d41-93d2-12b7e1be99b7', username: 'user-6', email: 'user-6@mail.com', password_hash, avatar_url: 'https://avatars.dicebear.com/api/avataaars/1.svg' }
]

const users: UserDB[] = [
	ADMIN,
	TEST_USER,
	...regularUsers
]

export default users