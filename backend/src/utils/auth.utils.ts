import { Context } from 'koa'
import { ErrorApi } from '../api/common/ErrorApi'
import { ExceptionCode } from '../api/common/exceptionCode'
import { RoleEnum } from '../api/components/user/model'
import { verifyJWT } from './jwt.utils'

export const checkAuthentification = async (authHeader?: string) => {
	if (!authHeader) {
		throw new ErrorApi(ExceptionCode.ERR_OP_001, 401, 'authentification')
	}

	if (!authHeader.startsWith('Bearer ')) {
		throw new ErrorApi(ExceptionCode.ERR_OP_001, 401, 'authentification')
	}

	const authToken = authHeader.substring(7)
	try {
		const { roles, userId } = await verifyJWT(authToken)

		return {
			userId,
			roles,
			authToken
		}

	} catch (error: any) {
		throw new ErrorApi(error.message)
	}
}

export const checkAuthorization = async (userRoles: RoleEnum[], requiredRoles: RoleEnum[]) => {

	const hasPermission = userRoles.some(userRole => requiredRoles.includes(userRole))

	if (!hasPermission) {
		throw new ErrorApi(ExceptionCode.ERR_OP_002, 403, 'authorization')
	}
}

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export const getUserFromContext = (ctx: Context): Awaited<ReturnType<typeof checkAuthentification>> => {
	return ctx.state.session
}
