import Application from 'koa'
import bodyParser from 'koa-bodyparser'
import registerCors from './cors'
import errorHandler from './error-handler'
import registerSwagger from './swagger'
import registerCookiesSetter from './set-cookies'
import registerCookie from './cookie'
import registerUserAgent from './user-agent'

import { registerRequestLogger, registerUserLogger } from './logger'

const registerMiddleware = (app: Application) => {
	registerCors(app)
	registerRequestLogger(app)
	app.use(bodyParser())
	registerCookie(app)
	registerUserAgent(app)
	registerCookiesSetter(app)
	registerUserLogger(app)
	app.use(errorHandler)
	registerSwagger(app)
	return app
}

export default registerMiddleware
