import Joi from 'joi'
import { Context, Next } from 'koa'
import { RequestSchema } from '../../../service/validator'
import { hashPassword } from '../../../utils/password.utils'
import { User } from './model'
import userService from './service'

type findAllQuery = {
	limit?: string, offset?: string
}

/**
 * Controller:
 * contains application logic and passes user input to service
 */
export class UserController {
	service = userService;

	constructor() {
		this.createUser = this.createUser.bind(this)
		this.findAll = this.findAll.bind(this)
		this.findById = this.findById.bind(this)
		this.deleteUser = this.deleteUser.bind(this)
		this.updateUser = this.updateUser.bind(this)
	}

	findAllSchema: RequestSchema = {
		query: {
			limit: Joi.number().optional(),
			offset: Joi.number().optional()
		}
	}

	async findAll(ctx: Context, next: Next): Promise<void> {
		const { limit, offset } = <findAllQuery>ctx.query || {}
		if (limit && offset) {
			ctx.body = await this.service.findAllPaginated(
				parseInt(limit),
				parseInt(offset)
			)
		} else {
			ctx.body = await this.service.findAll()
		}
		return next()
	}

	findByIdSchema: RequestSchema = {
		params: {
			id: Joi.string().uuid({ version: 'uuidv4' })
		}
	}

	async findById(ctx: Context, next: Next): Promise<void> {
		const { id } = <{ id: string }>ctx.params
		ctx.body = await this.service.findById(id)
		return next()
	}

	deleteUserSchema: RequestSchema = {
		params: {
			id: Joi.string().uuid({ version: 'uuidv4' })
		}
	}

	async deleteUser(ctx: Context, next: Next): Promise<void> {
		const { id } = <{ id: string }>ctx.params

		await this.service.deleteUser(id)
		ctx.status = 204
		return next()
	}

	createUserSchema: RequestSchema = {
		body: {
			id: Joi.string().uuid({ version: 'uuidv4' }).optional(),
			username: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string().min(4),
			avatarUrl: Joi.string()
		}
	}

	async createUser(ctx: Context, next: Next): Promise<void> {
		const newUser = <User>ctx.request.body
		const hashedPassword = await hashPassword(newUser.password || 'default')
		ctx.body = await this.service.createUser({ ...newUser, password: undefined, passwordHash: hashedPassword })
		return next()
	}

	updateUserSchema: RequestSchema = {
		body: {
			id: Joi.string().uuid({ version: 'uuidv4' }).optional(),
			username: Joi.string().optional(),
			email: Joi.string().email().optional(),
			avatarUrl: Joi.string().optional()
		}
	}

	async updateUser(ctx: Context, next: Next): Promise<void> {
		const userToUpdateTo = <User>ctx.request.body
		const userId = ctx.params.id
		const updatedUser = await this.service.updateUser(userId, userToUpdateTo)
		ctx.body = updatedUser
		return next()
	}
}
