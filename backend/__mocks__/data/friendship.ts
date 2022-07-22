import { IFriendship } from 'project-web-dev'
import { ADMIN, regularUsers } from './users'

export const friendships: IFriendship[] = [
	{
		id: '1db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[0].id,
		friend_two_id: regularUsers[1].id,
		status: 'confirmed'
	},
	{
		id: '2db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[1].id,
		friend_two_id: regularUsers[2].id,
		status: 'pending'
	},
	{
		id: '3db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[2].id,
		friend_two_id: regularUsers[0].id,
		status: 'pending'
	},
	{
		id: '4db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[2].id,
		friend_two_id: regularUsers[5].id,
		status: 'pending'
	},
	{
		id: '5db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[2].id,
		friend_two_id: regularUsers[4].id,
		status: 'pending'
	},
	{
		id: '6db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: regularUsers[4].id,
		friend_two_id: regularUsers[5].id,
		status: 'pending'
	},
	{
		id: '7db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: ADMIN.id,
		friend_two_id: regularUsers[5].id,
		status: 'pending'
	},
	{
		id: '8db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: ADMIN.id,
		friend_two_id: regularUsers[4].id,
		status: 'confirmed'
	},
	{
		id: '9db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: ADMIN.id,
		friend_two_id: regularUsers[1].id,
		status: 'confirmed'
	},
	{
		id: '0db6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: ADMIN.id,
		friend_two_id: regularUsers[2].id,
		status: 'confirmed'
	},
	{
		id: '1dc6de50-0135-457f-9667-2269746d7b07',
		friend_one_id: ADMIN.id,
		friend_two_id: regularUsers[3].id,
		status: 'confirmed'
	}
]
