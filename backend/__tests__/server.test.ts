import { Server } from 'http'
import app from 'backend/src/app'
import { getServer } from 'backend/src/utils'
import { env } from 'backend/src/config/globals'

jest.mock('backend/src/service/db', () => ({
	initDbConnection: jest.fn()
}))

const mockListen = jest.spyOn(app, 'listen')


describe('Server', () => {
	let server: Server

	afterAll(async () => {
		await server.close()
	})

	it('should launch the server', async () => {
		server = await getServer()
		expect(mockListen).toHaveBeenCalled()
		expect(mockListen.mock.calls.length).toBe(1)
		// first call first arg is
		expect(mockListen.mock.calls[0][0]).toBe(env.PORT || 4000)
	})
})