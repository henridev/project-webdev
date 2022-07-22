import * as Knex from 'knex'
import { T, Database } from '../src/config/globals'
import { gameFields } from '../src/api/components/game/repository'
const { schema } = Database

const { id, room_id, created_at, updated_at, creator_id } = gameFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	if (!(await knex.schema.withSchema(schema).hasTable(T.GAME))) {
		return knex.schema.withSchema(schema).createTable(T.GAME, (table) => {
			table.uuid(id).defaultTo(knex.raw('uuid_generate_v4()')).primary()
			table.uuid(room_id).notNullable()
			table.uuid(creator_id).unsigned().references('id').inTable(`${schema}.${T.USER}`).onDelete('CASCADE')
			table.timestamp(created_at).defaultTo(knex.fn.now())
			table.timestamp(updated_at).defaultTo(knex.fn.now())
		})
	}
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).dropTableIfExists(T.MEME)
}
