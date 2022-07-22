import { ConfigOptions } from 'cloudinary'
import { CLOUDINARY } from './globals'

const { API_KEY, API_SECRET, CLOUD_NAME } = CLOUDINARY

const cloudinaryConfig: ConfigOptions = {
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET
}

export default cloudinaryConfig