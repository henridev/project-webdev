import { Context, Next } from 'koa'
import { RoleEnum } from '../components/user/model'
import { checkAuthentification, checkAuthorization } from '../../utils'


export const requireAuthentication = async (ctx: Context, next: Next) => {
	const {
		authorization
	} = ctx.headers

	const {
		authToken,
		...session
	} = await checkAuthentification(authorization)

	ctx.state.session = session
	ctx.state.authToken = authToken

	return next()
}

export const requireAuthorization = (requiredRoles: RoleEnum[]) => async (ctx: Context, next: Next) => {
	const {
		roles = []
	} = ctx.state.session

	await checkAuthorization(roles, requiredRoles)
	return next()
}
