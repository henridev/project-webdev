import cors from '@koa/cors'
import Application from 'koa'
import corsConfig, { origins } from '../../config/cors'

/**
 *
 */
const registerCors = (app: Application) => {
	app.use(cors({
		...corsConfig,
		origin: (ctx: Application.Context) => {
			if (origins.includes(ctx.request.header.origin as string)) {
				return ctx.request.header.origin as string
			}
			return origins[0]
		}
	}))
}

export default registerCors