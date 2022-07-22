import { Knex } from 'knex'
import { MemeDB } from '../src/api/components/meme/model'
import { T } from '../src/config/globals'
import { memes } from '../__mocks__/data/memes'

export async function seed(knex: Knex): Promise<void> {
	await knex.withSchema(T.SCHEMA).table<MemeDB>(T.MEME).del()
	// Inserts seed entries
	await knex.withSchema(T.SCHEMA).table<MemeDB>(T.MEME).insert(memes)
}
