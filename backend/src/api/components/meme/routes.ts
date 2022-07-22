import Router from '@koa/router'
import { RoleEnum } from '../user/model'
import { validate } from '../../../service/validator'
import { requireAuthentication, requireAuthorization } from '../../middleware/auth'
import { uploadImage } from '../../middleware/cloudinary-image-upload'
import { MemeController } from './controller'
import { parseBodyForJson } from '../../middleware/parse-body-for-json'

export class MemeRoutes {
	readonly controller = new MemeController();
	readonly router = new Router();
	readonly prefixName = '/meme'

	constructor(prefix = '') {
		this.initRoutes(prefix)
	}

	initRoutes(prefix = ''): void {
		const p = prefix + this.prefixName

		/**
		* @swagger
		* /meme:
		*   post:
		*     description: add a meme to the collection
		*     tags : [Meme]
		*     produces:
		*       - application/json
		*     parameters:
		*       - in: body
		*         name : new meme body
		*         description : the new meme
		*         schema:
		*           $ref: '#/definitions/Meme'
		*     responses:
		*       200:
		*         description: the meme created
		*         schema:
		*           $ref: '#/definitions/Meme'
		*/
		this.router.post(
			p,
			requireAuthentication,
			requireAuthorization([RoleEnum.ADMIN]),
			...uploadImage({ fieldname: 'memeImage', bodyName: 'imgUrl' }),
			parseBodyForJson(),
			validate(this.controller.createMemeSchema),
			this.controller.createMeme
		)


		/**
		* @swagger
		* /meme:
		*   get:
		*     description: get all the memes
		*     tags : [Meme]
		*     produces:
		*       - application/json
		*     responses:
		*       200:
		*         schema:
		*           type: array
		*           items:
		*             $ref: '#/definitions/Meme'
		*/
		this.router.get(
			p,
			requireAuthentication,
			requireAuthorization([RoleEnum.ADMIN]),
			this.controller.findAllMemes
		)

		/**
		* @swagger
		* /meme/:id:
		*   delete:
		*     description: delete a meme
		*     tags : [Meme]
		*     produces:
		*       - application/json
		*     responses:
		*       204:
		*         description: confirmation of delete
		*/
		this.router.delete(
			`${p}/:id`,
			requireAuthentication,
			requireAuthorization([RoleEnum.ADMIN]),
			validate(this.controller.deleteMemeSchema),
			this.controller.deleteMeme
		)
	}
}
