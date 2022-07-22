import * as Knex from 'knex'
import { T, Database } from '../src/config/globals'
import { friendFields } from '../src/api/components/friend/repository'
const { schema } = Database

const { id, friend_one_id, friend_two_id, created_at, updated_at } = friendFields


export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	if (!(await knex.schema.withSchema(schema).hasTable(T.FRIENDSHIP))) {
		return knex.schema
			.withSchema(schema)
			.createTable(T.FRIENDSHIP, (table) => {
				table.uuid(id).defaultTo(knex.raw('uuid_generate_v4()')).primary()
				table
					.uuid(friend_one_id)
					.comment('this is the requester')
					.unsigned()
					.references('id')
					.inTable(`${schema}.${T.USER}`)
					.onDelete('CASCADE')
				table
					.uuid(friend_two_id)
					.unsigned()
					.references('id')
					.inTable(`${schema}.${T.USER}`)
					.onDelete('CASCADE')
				table.timestamp(created_at).defaultTo(knex.fn.now())
				table.timestamp(updated_at).defaultTo(knex.fn.now())
			})
	}
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).dropTableIfExists(T.FRIENDSHIP)
}
