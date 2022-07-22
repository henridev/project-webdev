import { User } from './model'
import { getChildLogger } from '../../../service/logger'
import userRepository, { UserRepository } from './repository'
import { ErrorApi } from '../../common/ErrorApi'
import { ExceptionCode } from '../../common/exceptionCode'
import { omit } from 'lodash'

const log = getChildLogger('user service')

/**
 * Service:
 * middleware between controller and repository.
 * Gather data from controller, performs validation and business logic,
 * and calling repositories for data manipulation.
 */
export class UserService {
	repository: UserRepository;

	constructor() {
		this.repository = userRepository
	}

	async findAll(): Promise<User[]> {
		return this.repository.findAll()
	}

	async findAllPaginated(limit: number, offset: number): Promise<User[]> {
		return this.repository.findAllPaginated(limit, offset)
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findById(id)
		if (!user) throw new ErrorApi(ExceptionCode.ERR_OP_006, 400)
		return omit(user, ['passwordHash', 'password_hash']) as User

	}

	async createUser(userToCreate: User): Promise<User> {
		return this.repository.createUser(userToCreate)
	}

	async updateUser(id: string, userToUpdate: User) {
		return this.repository.updateUser(
			id,
			userToUpdate
		)
	}

	async deleteUser(id: string): Promise<void> {
		return this.repository.deleteById(id)
	}
}

export default new UserService()
