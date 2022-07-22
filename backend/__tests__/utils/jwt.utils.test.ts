import { RoleEnum, User } from 'backend/src/api/components/user/model'
import { generateJWT, verifyJWT } from 'backend/src/utils'
import base64url from 'base64url'

describe('jwt utils', () => {
	const user: User = {
		id: '123abc',
		username: '123',
		email: '123@mail.com',
		roles: [RoleEnum.USER]
	}
	it('should verify a valid token', async () => {
		const jwt = await generateJWT(user)
		const jwtPayload = await verifyJWT(jwt)
		expect(jwtPayload).toMatchObject({ userId: user.id, roles: user.roles })
	})
	it('should detect an invalid token', async () => {

		const jwt = await generateJWT(user)

		const [header, payload, sig] = jwt.split('.')

		const parsedPayload = JSON.parse(base64url.decode(payload))

		parsedPayload.roles.push(RoleEnum.ADMIN)

		const modifiedPayloadEncoded = base64url(JSON.stringify(parsedPayload))
		const jwtFromModifiedPayload = [header, modifiedPayloadEncoded, sig].join('.')

		await expect(verifyJWT(jwtFromModifiedPayload)).rejects.toThrowError()
	})
})