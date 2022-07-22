import passport from 'koa-passport'
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import { RoleEnum } from '../api/components/user/model'
import userRepository from '../api/components/user/repository'
import { JWT } from './globals'
import { logger } from '../service/logger'



const options: StrategyOptions = {
	audience: JWT.AUDIENCE,
	issuer: JWT.ISSUER,
	secretOrKey: JWT.SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

}

type JwtPayload = {
	userId: string,
	roles: RoleEnum[],
	iat: number,
	exp: number,
	aud: string, // 'memes.hogent.be'
	iss: string, // 'memes.hogent.be'
	sub: string // 'auth'
}

const setUpAuth = () => {
	const strategy = new JwtStrategy(options, async (jwtPayload: JwtPayload, done) => {
		try {
			const user = await userRepository.findById(jwtPayload.userId)
			if (!user) return done(null, false)
			if (user) {
				return done(null, user)
			} else {
				return done(null, false)
				// or you could create a new account
			}
		} catch (error) {
			return done(error)
		}
	})

	passport.use(strategy)
}

export default setUpAuth