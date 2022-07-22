
import request from 'supertest'
import app from 'backend/src/app'


describe('routes to test', () => {
	it('should get the server status', async () => {
		const response = await request(app.callback()).get('/api/status')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({ status: 'online' })
	})
})