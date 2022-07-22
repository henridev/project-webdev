import * as Knex from 'knex'
import { T, Database } from '../src/config/globals'
import { userFields } from '../src/api/components/user/repository'
import { RoleEnum } from '../src/api/components/user/model'
const { schema } = Database

const { id, username, email, password_hash, avatar_url, roles, created_at, updated_at } = userFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	await knex.raw('create extension if not exists "uuid-ossp"')
	if (!(await knex.schema.withSchema(schema).hasTable(T.USER))) {
		return knex.schema.withSchema(schema).createTable(T.USER, (table) => {
			table.uuid(id).defaultTo(knex.raw('uuid_generate_v4()')).primary()
			table.text(username).notNullable().unique({ indexName: 'idx_user_username_unique' })
			table.text(email).notNullable().unique({ indexName: 'idx_user_email_unique' })
			table.text(password_hash).notNullable()
			table.text(avatar_url).notNullable()
			table.jsonb(roles).notNullable().defaultTo(JSON.stringify([RoleEnum.USER]))
			table.timestamp(created_at).defaultTo(knex.fn.now())
			table.timestamp(updated_at).defaultTo(knex.fn.now())
		})
	}
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).dropTableIfExists(T.USER)
}
