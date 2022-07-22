import request, { Response } from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import users, { ADMIN, DEFAULT_PASS, TEST_USER } from '../../../../__mocks__/data/users'
import withServer from '../../../helpers/withServer'
import login from '../../../helpers/login'
import expectToHaveAccess from '../../../helpers/expect-access'

describe('User entity route', () => {
	let agent: request.SuperAgentTest
	const newUserId1 = uuidv4()
	const newUserId2 = uuidv4()
	const id = users[0].id

	withServer(({ agent: a }) => {
		agent = a
	})

	describe('Access test', () => {
		const accessTest = (route: string, method: 'get' | 'post' | 'delete') =>
			async (username: string, expectedResult: string, args?: { body?: Record<string, any>, query?: Record<string, any>, params?: Record<string, any> }) => {
				const token = await login(agent, username, DEFAULT_PASS)
				const { body, query, params } = args || {}
				let response: Response

				if (method === 'post' && body) {
					response = await agent[method](route)
						.set('Authorization', token)
						.send(body)
				} else if (method === 'delete' && params) {
					const routeWithParam = route.replace(':id', params.userId)
					response = await agent[method](routeWithParam)
						.set('Authorization', token)
				} else {
					if (query) {
						const params = new URLSearchParams()
						Object.entries(query).forEach(([k, v]) => {
							params.append(k, v)
						})
						const routeWithQuery = route + '?' + params.toString()
						response = await agent[method](routeWithQuery)
							.set('Authorization', token)
					} else {
						response = await agent[method](route)
							.set('Authorization', token)
					}
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
			[ADMIN.username, expectToHaveAccess(true), { query: { limit: 1, offset: 2 } }],
			[TEST_USER.username, expectToHaveAccess(false), undefined]
		])('user %s %s access to api/user (GET)', accessTest('/api/user', 'get'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), undefined],
			[TEST_USER.username, expectToHaveAccess(true), undefined]
		])('user %s %s access to api/user/:id (GET)', accessTest(`/api/user/${id}`, 'get'))


		test.each([
			[ADMIN.username, expectToHaveAccess(true), {
				body: {
					id: newUserId1,
					username: newUserId1,
					email: `${newUserId1}@mail.com`,
					password: DEFAULT_PASS,
					avatarUrl: 'http://someurl.com'
				}
			}],
			[TEST_USER.username, expectToHaveAccess(true), {
				body: {
					id: newUserId2,
					username: newUserId2,
					email: `${newUserId2}@mail.com`,
					password: DEFAULT_PASS,
					avatarUrl: 'http://someurl.com'
				}
			}]
		])('user %s %s access to api/user (POST)', accessTest('/api/user', 'post'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), { params: { userId: newUserId1 } }],
			[TEST_USER.username, expectToHaveAccess(false), { params: { userId: newUserId2 } }]
		])('user %s %s access to api/user/:id (DELETE)', accessTest('/api/user/:id', 'delete'))
	})
})
