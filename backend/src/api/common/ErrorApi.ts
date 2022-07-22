import { ExceptionCode, findKeyFromValue } from './exceptionCode'

export class ErrorApi extends Error {
	statusCode?: number;
	type?: string;
	code: string | null;
	description: string;
	exception?: Error;

	constructor(exceptionCode: ExceptionCode, statusCode?: number, type?: string, exception?: Error) {
		super(exceptionCode)
		this.code = findKeyFromValue(exceptionCode)
		this.description = exceptionCode
		this.statusCode = statusCode
		this.type = type || 'operational'
		this.exception = exception
		Error.captureStackTrace(this, this.constructor)
	}
}
