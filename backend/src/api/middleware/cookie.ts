import Application from 'koa'
import cookie from 'koa-cookie'

const registerCookie = (app: Application) => {
	app.use(cookie())
}

export default registerCookie