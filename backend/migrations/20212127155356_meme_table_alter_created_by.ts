import * as Knex from 'knex'
import { memeFields } from '../src/api/components/meme/repository'
import { T, Database } from '../src/config/globals'
const { schema } = Database

const { creator_id } = memeFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema
		.withSchema(schema)
		.alterTable(T.MEME, (table) => {
			table
				.uuid(creator_id)
				.unsigned()
				.references('id')
				.inTable(`${schema}.${T.USER}`)
				.onDelete('CASCADE')
		})
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).alterTable(T.MEME, (table) => {
		table.dropColumn(creator_id)
	})
}
