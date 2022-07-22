import request from 'supertest'
import { Server } from 'http'
import { Knex } from 'knex'
import { getKnex } from 'backend/src/service/db'
import getServer from 'backend/src/utils/server.utils'

type HigherOrderAccess = {
	agent: request.SuperAgentTest,
	knex?: Knex<object, unknown[]> | Knex<any, unknown[]>
}

type WithServerOptions = { include?: { knex?: boolean } }

const withServer = (setter: (arg: HigherOrderAccess) => void, options: WithServerOptions = {}) => {
	let server: Server
	beforeAll(async () => {
		server = await getServer()
		setter({
			agent: request.agent(server),
			knex: options?.include?.knex ? getKnex() : undefined
		})
	})
	afterAll(async () => {
		await server.close()
	})
}

export default withServer