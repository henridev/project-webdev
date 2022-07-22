import { IUser } from 'project-web-dev';
import { RootState } from '../../config/store';

const selectUser = (state: RootState): IUser | null | undefined => state.auth.user;

export default selectUser;
