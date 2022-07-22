import Joi, { BaseValidationOptions, AnySchema, ValidationError } from 'joi'
import { Context, Next } from 'koa'
import { getChildLogger } from './logger'

const log = getChildLogger('validator')

const JOI_OPTIONS: BaseValidationOptions = {
	abortEarly: true,
	allowUnknown: false,
	context: {},
	convert: true,
	presence: 'required'
}

type Schema = Record<string, AnySchema>
type SchemaKeys = 'query' | 'body' | 'params'
type CleanError = Record<string, { type: string, message: string }[]>
export type RequestSchema = Partial<{
	query: Schema | AnySchema,
	body: Schema | AnySchema,
	params: Schema | AnySchema
}>

const cleanupJoiError = (error: undefined | ValidationError) => {
	const resultObject: CleanError = {}
	return error?.details.reduce((resultObj, currentDetail) => {
		const { message, path, type } = currentDetail
		const joinedPath = path.join('.') || 'value'
		if (!resultObj[joinedPath]) {
			resultObj[joinedPath] = []
		}
		resultObj[joinedPath].push({
			type,
			message
		})

		return resultObj
	}, resultObject)

}

export const validate = (schema: RequestSchema) => {
	if (!schema) {
		schema = {
			query: {},
			body: {},
			params: {}
		}
	}

	return (ctx: Context, next: Next) => {
		const errors: Record<SchemaKeys | string, ReturnType<typeof cleanupJoiError>> = {}
		const options: SchemaKeys[] = ['query', 'body', 'params']
		options.forEach(option => {
			if (schema[option]) {
				if (!Joi.isSchema(schema[option])) {
					schema[option] = Joi.object(schema[option] as AnySchema)
				}

				const {
					error,
					value
				} = (schema[option] as AnySchema).validate(
					option === 'body' ? ctx.request.body : ctx[option],
					JOI_OPTIONS
				)

				if (error) {
					errors[option] = cleanupJoiError(error)
				} else {
					option === 'body' ? ctx.request.body : ctx[option] = value
				}
			}
		})

		if (Object.keys(errors).length) {
			ctx.throw(400, 'Validation failed, check details for more information', {
				code: 'VALIDATION_FAILED',
				details: errors
			})
		}

		return next()
	}
}
