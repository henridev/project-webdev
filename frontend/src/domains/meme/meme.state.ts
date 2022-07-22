import { IMeme } from 'project-web-dev';
import { APIErrorInfo } from '../../../typings';

export interface MemeState {
	memes: IMeme[];
	status: 'idle' | 'loading' | 'error',
	pickedMeme?: IMeme;
	errorInfo?: APIErrorInfo
}

const memeState: MemeState = {
	memes: [],
	status: 'idle',
};

export default memeState;
