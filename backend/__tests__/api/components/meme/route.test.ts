import { Context, Next } from 'koa'
import request, { Response } from 'supertest'
import { ADMIN, DEFAULT_PASS, TEST_USER } from '../../../../__mocks__/data/users'
import { memes } from '../../../../__mocks__/data/memes'
import withServer from '../../../helpers/withServer'
import login from '../../../helpers/login'
import expectToHaveAccess from '../../../helpers/expect-access'

jest.mock('backend/src/api/middleware/cloudinary-image-upload', () => ({
	uploadImage: jest.fn().mockImplementation((options: { fieldname: string, bodyName: string }) => {
		const mocker = jest.fn().mockImplementation(async (ctx: Context, next: Next) => {
			const newBody = { ...ctx.request.body, [options.bodyName]: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/Monkey-Puppet_x3fvyl.jpg' }
			ctx.request.body = newBody
			return next()
		})
		return [mocker]
	})
}))

describe('Meme entity route', () => {
	let agent: request.SuperAgentTest
	const id = memes[1].id

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
			[TEST_USER.username, expectToHaveAccess(false), undefined]
		])('user %s %s access to api/meme (GET)', accessTest('/api/meme', 'get'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), undefined],
			[TEST_USER.username, expectToHaveAccess(false), undefined]
		])('user %s %s access to api/meme (DELETE)', accessTest(`/api/meme/${id}`, 'delete'))

		test.each([
			[ADMIN.username, expectToHaveAccess(true), { name: 'test', categories: ['funny'] }],
			[TEST_USER.username, expectToHaveAccess(false), { name: 'test', categories: ['funny'] }]
		])('user %s %s access to api/friend (POST)', accessTest('/api/meme', 'post'))
	})
})
