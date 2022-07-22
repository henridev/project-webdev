import { Context, Next } from 'koa'

const isJson = (str: any) => {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const parseBodyForJson = (options = {}) => {
	const addUrlToBody = async (ctx: Context, next: Next) => {
		const newBody = Object.keys(ctx.request.body)
			.map(key => {
				let value = ctx.request.body[key]
				if (isJson(value)) {
					value = JSON.parse(value)
				}
				return [key, value]
			})
			.reduce((obj, [key, value]) => {
				obj[key] = value
				return obj
			}, {} as any)
		ctx.request.body = newBody
		return next()
	}
	return addUrlToBody
}