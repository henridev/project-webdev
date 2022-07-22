import { Knex } from 'knex'
import { FriendStatus, IFriendshipDTO, IFriendship } from 'project-web-dev'
import { getKnex } from '../../../service/db'
import { T } from '../../../config/globals'
import { userFieldArr, userFields } from '../user/repository'
import { selectViaAliases } from '../../../utils'
import { ErrorApi } from '../../common/ErrorApi'
import { ExceptionCode } from '../../common/exceptionCode'
import { logger } from '../../../service/logger'
import { stringify } from 'querystring'


export enum friendFields {
	id = 'id',
	friend_one_id = 'friend_one_id',
	friend_two_id = 'friend_two_id',
	status = 'status',
	created_at = 'created_at',
	updated_at = 'updated_at,'
}
const friendFieldArr = Object.values(friendFields)
// const friendFieldsDb = converObjectToCamelCase(friendFields) as unknown as Friendship

export class FriendshipRepository {
	connection
	tableAbreviation = 'f';

	constructor() {
		this.connection = getKnex
	}

	async findAllByUserId(id: string, filter: Record<string, any> = {}): Promise<IFriendshipDTO[]> {
		const fields = this.getFindAllByUserIdFields()
		return this
			.getFriendships()
			.select(fields)
			.where(friendFields.friend_one_id, id)
			.andWhere(filter)
			.leftJoin(`${T.USER} as u`, friendFields.friend_two_id, 'u.id')
			.union(function () {
				const that = this as unknown as Knex
				that.withSchema(T.SCHEMA)
					.select(fields)
					.table(`${T.FRIENDSHIP} as f`)
					.where(friendFields.friend_two_id, id)
					.andWhere(filter)
					.leftJoin(`${T.USER} as u`, friendFields.friend_one_id, 'u.id')
			})
	}

	async findFriendshipById(userId: string, id: string): Promise<IFriendshipDTO> {
		const fields = this.getFindAllByUserIdFields()
		const [friendship] = await this
			.getFriendships()
			.select(fields)
			.where(friendFields.friend_one_id, userId)
			.andWhere('f.id', '=', id)
			.leftJoin(`${T.USER} as u`, friendFields.friend_two_id, 'u.id')
			.union(function () {
				const that = this as unknown as Knex
				that.withSchema(T.SCHEMA)
					.select(fields)
					.table(`${T.FRIENDSHIP} as f`)
					.where(friendFields.friend_two_id, userId)
					.andWhere('f.id', '=', id)
					.leftJoin(`${T.USER} as u`, friendFields.friend_one_id, 'u.id')
			})
		return friendship
	}

	async createFriendships(userId: string, friendId: string): Promise<IFriendshipDTO> {
		try {
			const [newFriendRequestId] = await this
				.getFriendships()
				.insert({ friend_one_id: userId, friend_two_id: friendId })
				.returning<Array<string>>('id')

			return await this.findFriendshipById(userId, newFriendRequestId)
		} catch (e: any) {
			if (e.constraint === 'friend_unique_index') {
				throw new ErrorApi(ExceptionCode.ERR_OP_008, 418, 'database', e)
			}
			throw new ErrorApi(ExceptionCode.ERR_TECH_999, 400, 'database', e)
		}
	}

	async changeFriendStatus(userId: string, friendId: string, status: FriendStatus): Promise<IFriendshipDTO> {
		const [updatedFriendshipId] = await this
			.getFriendships()
			.where({ id: friendId })
			.update({ status })
			.returning<Array<string>>('id')
		return await this.findFriendshipById(userId, updatedFriendshipId)
	}

	async deleteById(id: string): Promise<IFriendship> {
		const [removedFriendship] = await this
			.getFriendships()
			.where({ id })
			.delete()
			.returning('*')
		return removedFriendship
	}

	getFriendships() {
		return this.connection()
			.withSchema(T.SCHEMA)
			.table(`${T.FRIENDSHIP} as ${this.tableAbreviation}`)
	}

	getFindAllByUserIdFields() {
		return selectViaAliases([
			{
				alias: 'f',
				fields: friendFieldArr,
				prefix: 'friend'
			},
			{
				alias: 'u',
				fields: userFieldArr,
				prefix: 'user',
				excludeFields: [userFields.password_hash, userFields.roles, userFields.updated_at, userFields.created_at]
			}
		], { convertCamel: true })
	}
}

export default new FriendshipRepository()
