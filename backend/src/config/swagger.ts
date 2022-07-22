import { env } from './globals'
import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions: swaggerJSDoc.Options = {
	swaggerDefinition: {
		info: {
			version: '1.0',
			title: 'WebServices API',
			description: 'Documentation web-services API',
			servers: [`${env.SERVER_APP}:${env.HTTP_PORT}/api`]
		},
		basePath: '/api'
	},
	// Paths to files containing OpenAPI definitions
	apis: [
		__dirname + '../../api/components/**/routes.*',
		__dirname + '../../api/components/**/model.*'
	]
}
