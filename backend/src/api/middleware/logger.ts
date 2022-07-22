import Application from 'koa'
import { env } from '../../config/globals'
import { logger } from '../../service/logger'

export const registerUserLogger = (app: Application) => {
	app.use((ctx, next) => {
		if (env.NODE_ENV === 'development') {
			// logger.json({
			// 	user: ctx.state.user || 'no user',
			// 	userAgent: Object.entries(ctx.userAgent._agent).reduce((prev, curr) => {
			// 		const [key, val] = curr
			// 		if (!key.startsWith('is')) prev[key] = val
			// 		return prev
			// 	}, {} as Record<string, unknown>),
			// 	cookies: ctx.cookie
			// })
		}
		return next()
	})
}

export const registerRequestLogger = (app: Application) => {
	app.use((ctx, next) => {
		const ip: string | string[] | undefined =
			ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress
		logger.log({
			isRequest: true,
			level: 'info',
			message: `${ctx.req.method} ${ctx.req.url} ${ip}`
		})
		return next()
	})
}