import request, { Response } from 'supertest'
import users, { ADMIN, DEFAULT_PASS, TEST_USER } from '../../../../__mocks__/data/users'
import { friendships } from '../../../../__mocks__/data/friendship'
import withServer from '../../../helpers/withServer'
import login from '../../../helpers/login'
import expectToHaveAccess from '../../../helpers/expect-access'



describe('Friend entity route', () => {
	let agent: request.SuperAgentTest
	const username = users[0].username
	const id = friendships[1].id

	withServer(({ agent: a }) => {
		agent = a
	})

	describe('Access test', () => {
		const accessTest = (route: string, method: 'get' | 'post' | 'delete' | 'patch') =>
			async (username: string, expectedResult: string, body?: Record<string, any>) => {
				const token = await login(agent, username, DEFAULT_PASS)
				let response: Response

				if (body) {
					response = await agent[method](route)
						.set('Authorization', token)
						.send(body)
				} else {
					response = await agent[method](route)
						.set('Authorization', token)
				}

				if (expectedResult === expectToHaveAccess(true)) {
					expect(response.statusCode).toBeGreaterThanOrEqual(200)
					expect(response.statusCode).toBeLessThanOrEqual(300)
				} else {
					expect(response.statusCode).toBe(403)
				}
			}

		test.each([
			[ADMIN.username, expectToHaveAccess(true), undefined],
			[TEST_USER.username, expectToHaveAccess(true), undefined]
		])('user %s %s access to api/friend (GET)', accessTest('/api/friend', 'get'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), { username }],
			[TEST_USER.username, expectToHaveAccess(true), { username }]
		])('user %s %s access to api/friend (POST)', accessTest('/api/friend', 'post'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), { status: 'confirmed' }],
			[TEST_USER.username, expectToHaveAccess(true), { status: 'pending' }]
		])('user %s %s access to api/friend/:id (PATCH)', accessTest(`/api/friend/${id}`, 'patch'))


		test.each([
			[TEST_USER.username, expectToHaveAccess(true), undefined]
		])('user %s %s access to api/friend/:id (DELETE)', accessTest(`/api/friend/${id}`, 'delete'))
	})
})
