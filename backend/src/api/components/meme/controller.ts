import Joi from 'joi'
import { IMeme } from 'project-web-dev'
import { Context, Next } from 'koa'
import { RequestSchema } from '../../../service/validator'
import { getUserFromContext } from '../../../utils'
import memeService from './service'


export class MemeController {
	service = memeService;

	constructor() {
		this.createMeme = this.createMeme.bind(this)
		this.findAllMemes = this.findAllMemes.bind(this)
		this.deleteMeme = this.deleteMeme.bind(this)
	}

	createMemeSchema: RequestSchema = {
		body: {
			name: Joi.string().required(),
			imgUrl: Joi.string().required(),
			categories: Joi.array().items(Joi.string()).optional()
		}
	}

	async createMeme(ctx: Context, next: Next): Promise<void> {
		const userId = getUserFromContext(ctx).userId
		const meme = <IMeme>ctx.request.body
		ctx.body = await this.service.createMeme(userId, meme)
		return next()
	}

	async findAllMemes(ctx: Context, next: Next): Promise<void> {
		ctx.body = await this.service.findAllMemes()
		return next()
	}


	deleteMemeSchema: RequestSchema = {
		params: {
			id: Joi.string().uuid({ version: 'uuidv4' })
		}
	}

	async deleteMeme(ctx: Context, next: Next): Promise<void> {
		const { id } = <{ id: string }>ctx.params
		await this.service.deleteMeme(id)
		ctx.status = 204
		return next()
	}
}
