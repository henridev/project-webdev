import Router from '@koa/router'
import { validate } from '../../../service/validator'
import { requireAuthentication, requireAuthorization } from '../../middleware/auth'
import { UserController } from './controller'
import { RoleEnum } from './model'

/**
 * Class used for routes linked to user entity
 */
export class UserRoutes {
	readonly controller: UserController = new UserController();
	readonly router: Router = new Router();
	readonly prefixName = '/user'

	constructor(prefix = '') {
		this.initRoutes(prefix)
	}

	initRoutes(prefix = ''): void {
		const p = prefix + this.prefixName

		/**
		* @swagger
		* /user:
		*   get:
		*     description: get a user by id
		*     tags : [User]
		*     produces:
		*       - application/json
		*     responses:
		*       200:
		*         description: get all users
		*         schema:
		*           type: array
		*           items:
		*             $ref: '#/definitions/User'
		*/
		this.router.get(
			p,
			requireAuthentication,
			requireAuthorization([RoleEnum.ADMIN]),
			validate(this.controller.findAllSchema),
			this.controller.findAll
		)



		/**
		* @swagger
		* /user/{id}:
		*   get:
		*     description: get a user by id
		*     tags : [User]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: path
		*         name : id
		*         type : number
		*         description : user id
		*     responses:
		*       200:
		*         description: a user
		*         schema:
		*           type: object
		*           items:
		*             $ref: '#/definitions/User'
		*/
		this.router.get(
			`${p}/:id`,
			requireAuthentication,
			validate(this.controller.findByIdSchema),
			this.controller.findById
		)

		/**
		* @swagger
		* /user:
		*   post:
		*     description: create a user
		*     tags : [User]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: body
		*         name : user
		*         description : user to create
		*         schema:
		*           $ref: '#/definitions/User'
		*     responses:
		*       201:
		*         description: creation confirmation
		*/
		this.router.post(
			p,
			requireAuthentication,
			validate(this.controller.createUserSchema),
			this.controller.createUser
		)

		/**
		* @swagger
		* /user/{id}:
		*   put:
		*     description: modify a user
		*     tags : [User]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: path
		*         name : id
		*         schema:
		*           type : string
		*         required : true
		*       - in: body
		*         name : user
		*         description : user to modify
		*         schema:
		*           $ref: '#/definitions/User'
		*     responses:
		*       201:
		*         description: modification confirmation
		*/
		this.router.put(
			`${p}/:id`,
			requireAuthentication,
			validate(this.controller.updateUserSchema),
			this.controller.updateUser
		)

		/**
		* @swagger
		* /user/{id}:
		*   delete:
		*     description: delete a user
		*     tags : [User]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: path
		*         name : id
		*         schema:
		*           type : string
		*         required : true
		*     responses:
		*       204:
		*         description: confirmation of delete
		*/
		this.router.delete(
			`${p}/:id`,
			requireAuthentication,
			requireAuthorization([RoleEnum.ADMIN]),
			validate(this.controller.deleteUserSchema),
			this.controller.deleteUser
		)
	}
}
