import { getKnex } from '../../../service/db'
import { T } from '../../../config/globals'
import { converObjectToCamelCase, parseForDB } from '../../../utils'
import { Game } from './model'
import { logger } from '../../../service/logger'

export enum gameFields {
	id = 'id',
	room_id = 'room_id',
	updated_at = 'updated_at',
	created_at = 'created_at',
	creator_id = 'creator_id'
}
export const gameFieldArr = Object.values(gameFields)
const gameFieldsDb = converObjectToCamelCase(gameFields) as unknown as Game


export class GameRepository {
	connection
	tableAbreviation = 'g';

	constructor() {
		this.connection = getKnex
	}

	async findGameByRoomId(roomId: string) {
		const [game] = await this
			.getGames()
			.select(gameFieldsDb)
			.where({ room_id: roomId })
			.returning('*')
		return game
	}

	async createGame(userId: string, game: Omit<Game, 'creator_id' | 'id' | 'updatedAt' | 'createdAt'>) {
		const newGameValue = parseForDB({
			...game,
			creator_id: userId,
			updated_at: new Date()
		}, gameFieldArr)
		const [gameCreated] = await this
			.getGames()
			.insert(newGameValue)
			.returning('*')
		return converObjectToCamelCase(gameCreated) as unknown as Game
	}

	async addRandomMemeToGame(gameId: string) {
		const [meme] = await this
			.connection()
			.withSchema(T.SCHEMA)
			.table(T.MEME)
			.select('*')
			.whereNotIn('id',
				this.connection()
					.withSchema(T.SCHEMA)
					.table(T.T_MEME_GAME)
					.select('meme_id')
					.where({ game_id: gameId })
			)
			.orderByRaw('RANDOM()')
			.limit(1)
		await this
			.connection()
			.withSchema(T.SCHEMA)
			.table(T.T_MEME_GAME)
			.insert({
				game_id: gameId,
				meme_id: meme.id
			})

		return meme
	}





	getGames() {
		return this
			.connection()
			.withSchema(T.SCHEMA)
			.table<Game>(`${T.GAME} as ${this.tableAbreviation}`)
	}

}

export default new GameRepository()