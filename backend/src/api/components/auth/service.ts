import { getChildLogger } from '../../../service/logger'
import { generateJWT, hashPassword, verifyPassword } from '../../../utils'
import { ErrorApi } from '../../common/ErrorApi'
import { ExceptionCode } from '../../common/exceptionCode'
import { User } from '../user/model'
import userRepository, { UserRepository } from '../user/repository'

const log = getChildLogger('auth service')

const makeAuthPayload = async (user: User) => {
	const token = await generateJWT(user)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { passwordHash, password_hash, password, ...userClean } = user as (User & { password_hash: string })
	return {
		user: (userClean),
		token
	}
}

type AuthPayload = ReturnType<typeof makeAuthPayload>

export class AuthService {
	repository: UserRepository;

	constructor() {
		this.repository = userRepository
	}

	async register(user: User): Promise<AuthPayload> {
		log.debug(`registering ${user.username}`)
		const userExists = (await userRepository.findByEmail(user.email)) || (await userRepository.findByUserName(user.username))

		if (userExists) {
			throw new ErrorApi(ExceptionCode.ERR_OP_003, 409)
		}

		const hashedPassword = await hashPassword(user.password || 'default')
		const createdUser = await userRepository.createUser({ ...user, passwordHash: hashedPassword })
		return await makeAuthPayload(createdUser)
	}

	async login(username: string, password: string): Promise<AuthPayload> {
		log.debug(`login ${username}`)
		const user = (await userRepository.findByUserName(username))

		if (!user) {
			throw new ErrorApi(ExceptionCode.ERR_OP_004, 400)
		}

		const passwordValid = await verifyPassword(password, user.passwordHash!)
		if (!passwordValid) {
			throw new ErrorApi(ExceptionCode.ERR_OP_004, 401)
		}

		return await makeAuthPayload(user)
	}
}

export default new AuthService()
