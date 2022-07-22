import { IMeme } from 'project-web-dev';
import { RootState } from '../../config/store';

export const selectMemes = (state: RootState): IMeme[] => state.meme.memes;
export const selectPickedMeme = (state: RootState): IMeme | undefined => state.meme.pickedMeme;
