import request from 'supertest'
import { ADMIN, DEFAULT_PASS } from '../../__mocks__/data/users'


const login = async (agent: request.SuperAgentTest, username = ADMIN.username, password = DEFAULT_PASS) => {
	const res = await agent.post('/api/auth/login').send({ username, password })
	return 'Bearer ' + res.body.token
}

export default login