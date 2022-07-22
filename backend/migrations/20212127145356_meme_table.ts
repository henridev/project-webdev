import * as Knex from 'knex'
import { T, Database } from '../src/config/globals'
import { memeFields } from '../src/api/components/meme/repository'
const { schema } = Database

const { id, img_url, categories, name, created_at, updated_at } = memeFields

export async function up(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	if (!(await knex.schema.withSchema(schema).hasTable(T.MEME))) {
		return knex.schema.withSchema(schema).createTable(T.MEME, (table) => {
			table.uuid(id).defaultTo(knex.raw('uuid_generate_v4()')).primary()
			table.text(name).notNullable()
			table.jsonb(categories).notNullable().defaultTo(JSON.stringify(['fun']))
			table.text(img_url).notNullable().unique({ indexName: 'idx_image_unique' })
			table.timestamp(created_at).defaultTo(knex.fn.now())
			table.timestamp(updated_at).defaultTo(knex.fn.now())
		})
	}
}

export async function down(knex: Knex.Knex): Promise<Knex.Knex.SchemaBuilder> {
	return knex.schema.withSchema(schema).dropTableIfExists(T.MEME)
}
