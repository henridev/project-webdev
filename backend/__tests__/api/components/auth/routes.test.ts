import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import withServer from '../../../helpers/withServer'

describe('Auth controller', () => {
	let agent: request.SuperAgentTest
	const username = uuidv4()

	withServer(({ agent: a }) => {
		agent = a
	})


	describe('auth routes', () => {
		test.each([
			['/api/auth/register', { username: null }, 400],
			['/api/auth/login', { username: null }, 400],
			[
				'/api/auth/register',
				{ username, password: 'xxxxxxx', email: `${username}@mail.com`, avatarUrl: username },
				200
			],
			[
				'/api/auth/login',
				{ username, password: 'xxxxxxx' },
				200
			]
		])('route %s with body %o should return status %i', async (route, body, status) => {
			const res = await agent.post(route).send(body)
			expect(res.statusCode).toEqual(status)
			if (status === 200) {
				expect(res.body.token).toMatch(/.{22,}/)
				expect(res.body.user.username).toBe(body.username)
			} else {
				expect(res.body.token).toBeFalsy()
			}
		})
	})
})
