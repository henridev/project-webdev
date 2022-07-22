import { Knex } from 'knex'
import { T } from '../src/config/globals'
import { UserDB } from '../src/api/components/user/model'
import { ADMIN, regularUsers } from '../__mocks__/data/users'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries & related entries in other tables
	await knex.raw(`TRUNCATE "${T.SCHEMA}"."${T.USER}" CASCADE`)

	// Inserts seed entries
	await knex.withSchema(T.SCHEMA).table<UserDB>(T.USER).insert([...regularUsers, ADMIN])
}
