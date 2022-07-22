import { sign, SignOptions, Secret, verify, VerifyOptions, Jwt } from 'jsonwebtoken'
import { promisify } from 'util'
import { RoleEnum, User } from '../api/components/user/model'
import { JWT } from '../config/globals'
import { logger } from '../service/logger'


type JwtPayload = {
	userId: string,
	name: string,
	roles: RoleEnum[],
	iat: number,
	exp: number,
	aud: string, // 'memes.hogent.be'
	iss: string, // 'memes.hogent.be'
	sub: string // 'auth'
}

export const generateJWT = async (user: User) => {
	const tokenData: string | object | Buffer = {
		userId: user.id,
		roles: user.roles,
		name: user.username
	}

	const signOptions: SignOptions = {
		audience: JWT.AUDIENCE,
		issuer: JWT.ISSUER,
		subject: 'auth',
		expiresIn: JWT.EXPIRATION
	}

	const asyncSign = promisify<object, Secret, SignOptions>(sign)

	try {
		const token = await asyncSign(tokenData, JWT.SECRET, signOptions) as unknown as string
		return token
	} catch (error: any) {
		logger.error('error during JWT signing', { error: error.message })
		throw error
	}
}


export const verifyJWT = async (token: string) => {
	const verifyOptions: VerifyOptions = {
		audience: JWT.AUDIENCE,
		issuer: JWT.ISSUER,
		subject: 'auth'
	}

	const asyncVerification = promisify<string, Secret, VerifyOptions>(verify)

	try {
		const decodedToken = (await asyncVerification(token, JWT.SECRET, verifyOptions)) as unknown as JwtPayload
		if (!decodedToken) throw new Error('no token jwt returned')
		return decodedToken
	} catch (error: any) {
		logger.error('error during JWT verification', { error: error.message })
		throw error
	}
}