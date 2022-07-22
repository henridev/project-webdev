import Joi from 'joi'
import { Context, Next } from 'koa'
import { RequestSchema } from '../../../service/validator'
import { getUserFromContext } from '../../../utils'
import friendshipService from './service'

// const log = getChildLogger('friend controller')
export class FriendshipController {
	service = friendshipService;

	constructor() {
		this.findAllByUserId = this.findAllByUserId.bind(this)
		this.deleteFriendship = this.deleteFriendship.bind(this)
		this.changeFriendStatus = this.changeFriendStatus.bind(this)
		this.createFriendship = this.createFriendship.bind(this)
	}


	findAllByUserIdSchema: RequestSchema = {
		params: {
			status: Joi.string().optional()
		}
	}


	async findAllByUserId(ctx: Context, next: Next): Promise<void> {
		const filter = <{ status: string }>ctx.query
		const userId = getUserFromContext(ctx).userId
		ctx.body = await this.service.findAllByUserId(userId, filter)
		return next()
	}

	deleteFriendshipSchema: RequestSchema = {
		params: {
			id: Joi.string().uuid({ version: 'uuidv4' })
		}
	}

	async deleteFriendship(ctx: Context, next: Next): Promise<void> {
		const FriendshipId = ctx.params.id
		ctx.body = await this.service.deleteFriendship(FriendshipId)
		return next()
	}

	changeFriendStatusSchema: RequestSchema = {
		body: {
			status: Joi.string().valid('confirmed', 'pending').required()
		},
		params: {
			id: Joi.string().required()
		}
	}

	async changeFriendStatus(ctx: Context, next: Next): Promise<void> {
		const status = ctx.request.body.status
		const friendshipId = ctx.params.id
		const userId = getUserFromContext(ctx).userId
		ctx.body = await this.service.changeFriendStatus(userId, friendshipId, status)
		return next()
	}

	createFriendshipSchema: RequestSchema = {
		body: {
			username: Joi.string().required()
		}
	}

	async createFriendship(ctx: Context, next: Next): Promise<void> {
		const friendUsername = ctx.request.body.username
		const userId = getUserFromContext(ctx).userId
		ctx.body = await this.service.createFriendship(userId, friendUsername)
		return next()
	}
}
