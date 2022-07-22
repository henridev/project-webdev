import Router from '@koa/router'
import { validate } from '../../../service/validator'
import { AuthController } from './controller'
import { uploadImage } from '../../middleware/cloudinary-image-upload'

export class AuthRoutes {
	readonly controller = new AuthController();
	readonly router = new Router();
	readonly prefixName = '/auth'

	constructor(prefix = '') {
		this.initRoutes(prefix)
	}

	initRoutes(prefix = ''): void {
		const p = prefix + this.prefixName

		/**
		* @swagger
		* /auth/login:
		*   post:
		*     description: log a user in
		*     tags : [User]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: body
		*         name : NewUserBody
		*         description : the new user
		*         schema:
		*           $ref: '#/definitions/User'
		*     responses:
		*       200:
		*         description: user loged in
		*         schema:
		*           $ref: '#/definitions/User'
		*/
		this.router.post(
			`${p}/login`,
			validate(this.controller.LoginValidationSchema),
			this.controller.login
		)

		/**
		* @swagger
		* /auth/register:
		*   post:
		*     description: register a new user
		*     tags : [User]
		*     produces: application/json
		*     parameters:
		*       - in: body
		*         name : NewUserBody
		*         description : the new user
		*         schema:
		*           $ref: '#/definitions/User'
		*     responses:
		*       200:
		*         description: user loged in
		*         schema:
		*           $ref: '#/definitions/User'
		*/
		this.router.post(
			`${p}/register`,
			...uploadImage({ fieldname: 'heroImage', bodyName: 'heroUrl' }),
			validate(this.controller.RegisterValidationSchema),
			this.controller.register
		)
	}
}
