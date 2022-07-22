import Joi from 'joi'
import { Context, Next } from 'koa'
import { User } from '../user/model'
import { RequestSchema } from '../../../service/validator'
import authService from './service'

export class AuthController {
	service = authService;

	constructor() {
		this.register = this.register.bind(this)
		this.login = this.login.bind(this)
	}

	RegisterValidationSchema: RequestSchema = {
		body: {
			username: Joi.string().max(255).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(5).max(30).required(),
			avatarUrl: Joi.string().optional(),
			heroUrl: Joi.string().optional()
		}
	}

	async register(ctx: Context, next: Next): Promise<void> {
		const user = <User>ctx.request.body
		ctx.body = await authService.register(user)
		return next()
	}

	LoginValidationSchema: RequestSchema = {
		body: {
			username: Joi.string().max(255).required(),
			password: Joi.string().min(5).max(30).required()
		}
	}

	async login(ctx: Context, next: Next): Promise<void> {
		const { username, password } = <User>ctx.request.body
		ctx.body = await authService.login(username, password!)
		return next()
	}
}
