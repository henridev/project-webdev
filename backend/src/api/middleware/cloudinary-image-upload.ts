import multer from '@koa/multer'
import { v2 as cloudinary } from 'cloudinary'
import { Context, Next } from 'koa'
import { getChildLogger } from '../../service/logger'
import { ErrorApi } from '../common/ErrorApi'
import { ExceptionCode } from '../common/exceptionCode'
import cloudinaryConfig from '../../config/cloudinary'

const log = getChildLogger('image upload middleware')

cloudinary.config(cloudinaryConfig)
const upload = multer({})

export const uploadImage = (options: { fieldname: string, bodyName: string }) => {
	const extractFile = upload.single(options.fieldname)
	const addUrlToBody = async (ctx: Context, next: Next) => {
		if (ctx?.request?.file?.buffer) {
			const imgBufferBase64 = ctx.request.file.buffer.toString('base64')
			const type = ctx.request.file.mimetype || 'image/jpeg'
			const base64Url = `data:${type};base64,` + imgBufferBase64

			const imgUrl = await new Promise((res, rej) => {
				cloudinary.uploader.upload(base64Url, async (error, result) => {
					if (error) {
						rej(new ErrorApi(ExceptionCode.ERR_TECH_002, 400, 'upload', error))
					}
					res(result?.secure_url)
				})
			})
			const newBody = { ...ctx.request.body, [options.bodyName]: imgUrl }
			ctx.request.body = newBody
		} else {
			log.error('no image file included')
		}
		return next()
	}
	return [extractFile, addUrlToBody]
}