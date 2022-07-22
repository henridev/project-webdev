import Koa from 'koa'
import { logger } from '../../service/logger'

const errorHandler = async (
	ctx: Koa.Context,
	next: Koa.Next
) => {
	try {
		await next()
	} catch (err: any) {
		err.statusCode = err.statusCode || 500
		err.type = err.type || 'TECH'
		err.code = err.code || 'UNHANDLED'

		if (err.exception) {
			logger.error(err.exception.description || err.exception.message)
		}
		if (err.details) {
			logger.error(JSON.stringify(err.details))
		}
		logger.error(err.stack)

		ctx.response.res.statusCode = err.statusCode
		ctx.status = err.statusCode

		ctx.body = {
			type: err.type,
			code: err.code,
			message: err.message
		}
	}

}

export default errorHandler