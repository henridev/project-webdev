import Router from '@koa/router'
import Application, { Context } from 'koa'
import serve from 'koa-static'
import path from 'path'
import { AuthRoutes } from './auth/routes'
import { FriendRoutes } from './friend/routes'
import { MemeRoutes } from './meme/routes'
import { UserRoutes } from './user/routes'

export async function registerApiRoutes(
	app: Application,
	prefix = '/api'
): Promise<Application<Application.DefaultState, Application.DefaultContext>> {

	const routes = [UserRoutes, AuthRoutes, FriendRoutes, MemeRoutes]
	routes.forEach(Route => {
		const route = new Route(prefix)
		app.use(route.router.routes()).use(route.router.allowedMethods())
	})

	const router = new Router()

	router.get(`${prefix}/status`, (ctx: Context) => {
		ctx.body = { status: 'online' }
	})


	app.use(router.routes())

	const spaPath = path.join(process.cwd(), '..', '/frontend/build')
	app.use(serve(spaPath))

	return app
}