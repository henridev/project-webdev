import { APIErrorInfo } from '../../../typings';

// eslint-disable-next-line max-len
const getErrorInfo = async (error: any): Promise<APIErrorInfo> => (await error?.response.json()) || { message: '', code: '', type: '' };
export default getErrorInfo;
