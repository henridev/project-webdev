import * as Knex from 'knex'
import { userFields } from '../src/api/components/user/repository'
import { T, Database } from '../src/config/globals'
const { schema } = Database

const { hero_url } = userFields
const defaultUrl = 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/nature-design.jpg'

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema
		.withSchema(schema)
		.alterTable(T.USER, (table) => {
			table
				.text(hero_url)
				.defaultTo(defaultUrl)
		})
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).alterTable(T.USER, (table) => {
		table.dropColumn(hero_url)
	})
}
