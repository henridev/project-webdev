import * as Knex from 'knex'
import { friendFields } from '../src/api/components/friend/repository'
import { T, Database } from '../src/config/globals'
const { schema } = Database

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema
		.withSchema(schema)
		.alterTable(T.FRIENDSHIP, (table) => {
			table.unique([friendFields.friend_one_id, friendFields.friend_two_id], { indexName: 'friend_unique_index' })
		})
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).alterTable(`${T.FRIENDSHIP}`, (table) => {
		table.dropUnique([], 'friend_unique_index')
	})
}
