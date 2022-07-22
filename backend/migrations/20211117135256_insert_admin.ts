import * as Knex from 'knex'
import { Role, RoleEnum, UserDB } from '../src/api/components/user/model'
import { T, Database } from '../src/config/globals'
import { hashPassword } from '../src/utils/password.utils'
const { schema } = Database

const adminID = process.env.ADMIN_ID || '24c6cb08-c8ab-4cfc-b104-052b6e25cc15'
const adminPassword = process.env.ADMIN_PASS || 'admin'
const adminEmail = process.env.ADMIN_EMAIL || 'admin@mail.com'
const adminName = process.env.ADMIN_NAME || 'admin'



export async function up(knex: Knex.Knex): Promise<void> {
	const hashedPassword = await hashPassword(adminPassword)

	knex.withSchema(T.SCHEMA).table<UserDB>(T.USER).insert({
		id: adminID,
		username: adminName,
		email: adminEmail,
		passwordHash: hashedPassword,
		avatar_url: 'https://avatars.dicebear.com/api/avataaars/123.svg',
		roles: JSON.stringify([RoleEnum.ADMIN]) as unknown as Role[]
	})

}

export async function down(knex: Knex.Knex): Promise<void> {
	return knex(T.USER).withSchema(schema).where({ id: adminID }).delete()
}
