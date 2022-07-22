import { User, UserDB } from './model'

import { ErrorApi } from '../../common/ErrorApi'
import { ExceptionCode } from '../../common/exceptionCode'
import { getKnex } from '../../../service/db'
import { T } from '../../../config/globals'
import { converObjectToCamelCase, parseForDB } from '../../../utils/object.utils'

export enum userFields {
	id = 'id',
	username = 'username',
	email = 'email',
	password_hash = 'password_hash',
	avatar_url = 'avatar_url',
	hero_url = 'hero_url',
	roles = 'roles',
	updated_at = 'updated_at',
	created_at = 'created_at'
}
export const userFieldArr = Object.values(userFields)
const userFieldsDb = converObjectToCamelCase(userFields) as unknown as User

/**
 * Repositories:
 * layer for interaction with models and performing CRUD DB operations
 */
export class UserRepository {
	connection
	tableAbreviation = 'u';

	constructor() {
		this.connection = getKnex
	}

	async findAll(): Promise<User[]> {
		return this
			.getUsers()
			.select(userFieldsDb)
	}

	async findAllPaginated(limit: number, offset: number): Promise<User[]> {
		return this
			.getUsers()
			.select(userFieldsDb)
			.limit(limit)
			.offset(offset)
	}

	async findById(id: string): Promise<User | undefined> {
		return this
			.getUsers()
			.select(userFieldsDb)
			.where('id', id)
			.first()
	}

	async findByUserName(username: string): Promise<User | undefined> {
		return this
			.getUsers()
			.select(userFieldsDb)
			.where({ username })
			.first()
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this
			.getUsers()
			.select(userFieldsDb)
			.where('u.email', email)
			.first()
	}

	async createUser(user: User): Promise<User> {
		const newUserValue = parseForDB({
			...user,
			updated_at: new Date()
		}, userFieldArr)

		const [userCreated] = await this
			.getUsers()
			.insert(newUserValue)
			.returning('*')

		return userCreated
	}

	async updateUser(id: string, fields: Partial<User>): Promise<User | undefined> {
		try {
			const fieldsToUpdate = parseForDB({
				...fields,
				updated_at: new Date()
			}, userFieldArr)

			const [updatedUser] = await this
				.getUsers()
				.where({ id })
				.update(fieldsToUpdate)
				.returning('*')

			return updatedUser

		} catch (e: any) {

			throw e?.code === '23505' ?
				new ErrorApi(ExceptionCode.ERR_OP_007, 422, 'database', e) :
				new ErrorApi(ExceptionCode.ERR_TECH_999, 500, 'database', e)

		}
	}

	async deleteById(id: string): Promise<void> {
		return this.
			getUsers()
			.where({ id: id })
			.delete()
	}

	getUsers() {
		return this
			.connection()
			.withSchema(T.SCHEMA)
			.table<UserDB>(`${T.USER} as ${this.tableAbreviation}`)
	}
}

export default new UserRepository()
