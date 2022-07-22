import * as Knex from 'knex'
import { T, Database } from '../src/config/globals'
import { gameFields } from '../src/api/components/game/repository'
import { memeFields } from '../src/api/components/meme/repository'
const { schema } = Database

const { id: gameId } = gameFields
const { id: memeId } = memeFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	if (!(await knex.schema.withSchema(schema).hasTable(T.T_MEME_GAME))) {
		return knex.schema.withSchema(schema).createTable(T.T_MEME_GAME, (table) => {
			table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
			table.uuid('game_id')
				.unsigned()
				.references(gameId)
				.inTable(`${schema}.${T.GAME}`)
				.onDelete('CASCADE')
			table.uuid('meme_id')
				.unsigned()
				.references(memeId)
				.inTable(`${schema}.${T.MEME}`)
				.onDelete('CASCADE')
		})
	}
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).dropTableIfExists(T.T_MEME_GAME)
}
