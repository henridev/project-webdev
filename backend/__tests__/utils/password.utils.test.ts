import { hashPassword, verifyPassword } from 'backend/src/utils'

describe('password utils', () => {
	const password = 'admin'
	let hash: string
	it('should create a hash', async () => {
		hash = await hashPassword(password)
		expect(hash).toBeTruthy()
	})
	it('should verify a valid password', async () => {
		const isValid = await verifyPassword(password, hash)
		expect(isValid).toBeTruthy()
	})

	it('should verify a invalid password', async () => {
		const isValid = await verifyPassword(password, hash + 'X')
		expect(isValid).toBeFalsy()
	})
})