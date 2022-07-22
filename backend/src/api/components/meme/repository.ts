import { MemeDB } from './model'
import { getKnex } from '../../../service/db'
import { T } from '../../../config/globals'
import { IMeme } from 'project-web-dev'
import { converObjectToCamelCase, parseForDB } from '../../../utils'

export enum memeFields {
	id = 'id',
	name = 'name',
	img_url = 'img_url',
	categories = 'categories',
	updated_at = 'updated_at',
	created_at = 'created_at',
	creator_id = 'creator_id'
}
export const memeFieldArr = Object.values(memeFields)
const memeFieldsDb = converObjectToCamelCase(memeFields) as unknown as IMeme


export class MemeRepository {
	connection
	tableAbreviation = 'm';

	constructor() {
		this.connection = getKnex
	}

	async createMeme(userId: string, meme: IMeme) {
		const newMemeValue = parseForDB({
			...meme,
			creator_id: userId,
			updated_at: new Date(),
			categories: JSON.stringify(meme.categories)
		}, memeFieldArr)
		const [memeCreated] = await this
			.getMemes()
			.insert(newMemeValue)
			.returning('*')
		return converObjectToCamelCase(memeCreated) as unknown as IMeme
	}

	async findAllMemes() {
		const memes = await this
			.getMemes()
			.select(memeFieldsDb)
			.returning('*')
		return memes as IMeme[]
	}

	async deleteById(id: string): Promise<void> {
		return this.
			getMemes()
			.where({ id: id })
			.delete()
	}


	getMemes() {
		return this
			.connection()
			.withSchema(T.SCHEMA)
			.table<MemeDB>(`${T.MEME} as ${this.tableAbreviation}`)
	}

}

export default new MemeRepository()