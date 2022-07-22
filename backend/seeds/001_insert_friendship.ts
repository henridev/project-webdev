import { Knex } from 'knex'
import { IFriendship } from 'project-web-dev'
import { T } from '../src/config/globals'
import { friendships } from '../__mocks__/data/friendship'

export async function seed(knex: Knex): Promise<void> {
	await knex.withSchema(T.SCHEMA).table<IFriendship>(T.FRIENDSHIP).del()
	// Inserts seed entries
	await knex.withSchema(T.SCHEMA).table<IFriendship>(T.FRIENDSHIP).insert(friendships)
}
