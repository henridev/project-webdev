import { IMeme } from 'project-web-dev'
import memeRepository, { MemeRepository } from './repository'
import { getChildLogger } from '../../../service/logger'

const log = getChildLogger('meme service')

export class MemeService {
	repository: MemeRepository;

	constructor() {
		this.repository = memeRepository
	}

	async createMeme(userId: string, meme: IMeme): Promise<IMeme> {
		return this.repository.createMeme(userId, meme)
	}

	async deleteMeme(id: string): Promise<void> {
		return this.repository.deleteById(id)
	}

	async findAllMemes(): Promise<IMeme[]> {
		return this.repository.findAllMemes()
	}
}

export default new MemeService()