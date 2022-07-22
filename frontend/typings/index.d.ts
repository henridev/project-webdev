/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./react-table-config.d.ts" />
/// <reference path="./jwt-check-expiration.d.ts" />

export interface APIErrorInfo {
	message: string;
	statusCode?: number | string
}
