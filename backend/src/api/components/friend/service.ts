import { FriendStatus, IFriendshipDTO, IFriendship } from 'project-web-dev'
import { ExceptionCode } from '../../common/exceptionCode'
import { ErrorApi } from '../../common/ErrorApi'
import friendshipRepository, { FriendshipRepository } from './repository'
import userRepository from '../user/repository'

export class FriendshipService {
	repository: FriendshipRepository;

	constructor() {
		this.repository = friendshipRepository
	}

	async findAllByUserId(id: string, filter?: Record<string, any>): Promise<IFriendshipDTO[]> {
		return this.repository.findAllByUserId(id, filter)
	}

	async changeFriendStatus(userId: string, friendshipId: string, status: FriendStatus) {
		return this.repository.changeFriendStatus(userId, friendshipId, status)
	}

	async createFriendship(userId: string, friendName: string): Promise<IFriendshipDTO> {
		const friendToAdd = await userRepository.findByUserName(friendName)
		if (!friendToAdd) {
			throw new ErrorApi(ExceptionCode.ERR_OP_006, 404)
		}

		return this.repository.createFriendships(userId, friendToAdd.id)
	}

	async deleteFriendship(id: string): Promise<IFriendship> {
		return this.repository.deleteById(id)
	}
}

export default new FriendshipService()
