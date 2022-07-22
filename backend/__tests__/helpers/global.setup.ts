import { T } from 'backend/src/config/globals'
import { getKnex, initDbConnection } from 'backend/src/service/db'
import { friendships } from '../../__mocks__/data/friendship'
import { memes } from '../../__mocks__/data/memes'
import users from '../../__mocks__/data/users'

const setup = async () => {
	console.log('============= SETUP START ============')
	await initDbConnection()

	const knex = getKnex()

	// Insert test users with password 12345678
	await knex.withSchema(T.SCHEMA).table(T.USER).insert(users)
	await knex.withSchema(T.SCHEMA).table(T.FRIENDSHIP).insert(friendships)
	await knex.withSchema(T.SCHEMA).table(T.MEME).insert(memes)
	console.log('=============  SETUP END  ============')
}




export default setup