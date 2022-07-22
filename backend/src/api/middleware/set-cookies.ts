

import Application from 'koa'

const registerCookiesSetter = (app: Application) => {
	app.use((ctx, next) => {
		ctx.cookies.set('last-response', Date.now().toString(), { httpOnly: false })
		return next()
	})
}

export default registerCookiesSetter