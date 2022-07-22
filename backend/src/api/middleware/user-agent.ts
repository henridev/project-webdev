import Application from 'koa'
import { userAgent } from 'koa-useragent'

const registerUserAgent = (app: Application) => {
	app.use(userAgent)
}

export default registerUserAgent