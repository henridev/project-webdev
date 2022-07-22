import { env } from './globals'
import cors from '@koa/cors'

export const origins = [env.WEB_APP]

const corsConfig: cors.Options = {
	allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
	allowHeaders: ['Accept', 'Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'x-requested-with'],
	maxAge: 3 * 60 * 60,
	credentials: true
}

export default corsConfig