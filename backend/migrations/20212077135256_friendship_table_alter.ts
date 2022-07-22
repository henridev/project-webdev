import * as Knex from 'knex'
import { friendFields } from '../src/api/components/friend/repository'
import { T, Database } from '../src/config/globals'
const { schema } = Database

const { status } = friendFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema
		.withSchema(schema)
		.alterTable(T.FRIENDSHIP, (table) => {
			table.text(status).defaultTo('pending')
		})
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).alterTable(`${T.FRIENDSHIP}`, (table) => {
		table.dropColumn(status)
	})
}
