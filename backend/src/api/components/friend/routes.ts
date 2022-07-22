import Router from '@koa/router'
import { validate } from '../../../service/validator'
import { requireAuthentication } from '../../middleware/auth'
import { FriendshipController } from './controller'


export class FriendRoutes {
	readonly controller: FriendshipController = new FriendshipController();
	readonly router: Router = new Router();
	readonly prefixName = '/friend'

	constructor(prefix = '') {
		this.initRoutes(prefix)
	}

	initRoutes(prefix = ''): void {
		const p = prefix + this.prefixName

		/**
		* @swagger
		* /friend:
		*   get:
		*     description: get all friends of a user
		*     tags : [Friendship]
		*     produces:
		*       - application/json
		*     responses:
		*       200:
		*         description: all friends found for a user
		*         schema:
		*           type: array
		*           items:
		*             $ref: '#/definitions/FriendshipDTO'
		*/
		this.router.get(
			p,
			requireAuthentication,
			validate(this.controller.findAllByUserIdSchema),
			this.controller.findAllByUserId
		)


		/**
		* @swagger
		* /friend:
		*   post:
		*     description: create a new friendship request
		*     tags : [Friendship]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: body
		*         name : username
		*         description : username of friend to add
		*         schema:
		*           type: string
		*     responses:
		*       201:
		*         description: a friendship
		*         schema:
		*           type: object
		*           items:
		*             $ref: '#/definitions/FriendshipDTO'
		*/
		this.router.post(
			p,
			requireAuthentication,
			validate(this.controller.createFriendshipSchema),
			this.controller.createFriendship
		)

		/**
		* @swagger
		* /friend/{id}:
		*   patch:
		*     description: accept a friend with a user
		*     tags : [Friendship]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: body
		*         name : status
		*         description : the updated status
		*         schema:
		*           type: string
		*     responses:
		*       204:
		*         description: a friendship dto
		*         schema:
		*           type: object
		*           items:
		*             $ref: '#/definitions/FriendshipDTO'
		*/
		this.router.patch(
			`${p}/:id`,
			requireAuthentication,
			validate(this.controller.changeFriendStatusSchema),
			this.controller.changeFriendStatus
		)


		/**
		* @swagger
		* /friend/{id}:
		*   delete:
		*     description: delete a friend
		*     tags : [Friendship]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: path
		*         name : id
		*         description : friendship id
		*         schema:
		*           type : string
		*         required : true
		*     responses:
		*       204:
		*         description: confirmation of friend deletion
		*/
		this.router.delete(
			`${p}/:id`,
			requireAuthentication,
			validate(this.controller.deleteFriendshipSchema),
			this.controller.deleteFriendship
		)
	}
}
