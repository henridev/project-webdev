import Application from 'koa'
import swaggerJSDoc from 'swagger-jsdoc'
import { koaSwagger } from 'koa2-swagger-ui'
import { swaggerOptions } from '../../config/swagger'

export const registerSwagger = (app: Application) => {
	const swaggerDocs = swaggerJSDoc(swaggerOptions)
	app.use(
		koaSwagger({
			routePrefix: '/docs',
			swaggerOptions: {
				spec: swaggerDocs as Record<string, unknown>
			}
		})
	)
}

export default registerSwagger