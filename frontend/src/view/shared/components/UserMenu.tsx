import { FC, ReactElement, useEffect } from 'react';
import { Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import selectUser from '../../../domains/auth/auth.selector';
import { logout } from '../../../domains/auth/auth.thunks';
import { LoginPopup, SignupPopup } from '../../auth';

type Props = {
}

const UserMenu: FC<Props> = (): ReactElement => {
	const loginPopupControl = useDisclosure();
	const signupPopupControl = useDisclosure();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		if (user) {
			loginPopupControl.onClose();
			signupPopupControl.onClose();
		}
	}, [user]);

	return (
		<>
			{signupPopupControl.isOpen && <SignupPopup popupControl={signupPopupControl} />}
			{loginPopupControl.isOpen && <LoginPopup popupControl={loginPopupControl} />}
			<Menu>
				<MenuButton
					data-cy="user_button"
					as={Button}
					rounded="full"
					variant="link"
					cursor="pointer"
					minW={0}
				>
					<Avatar
						size="sm"
						src={user?.avatarUrl}
					/>
				</MenuButton>
				<MenuList>
					{!user && <MenuItem
						data-cy="signin_button"
						onClick={signupPopupControl.onOpen}
					>
						Sign up
					</MenuItem>}
					{!user && <MenuItem
						data-cy="login_button"
						onClick={loginPopupControl.onOpen}
					>
						Log in
					</MenuItem>}
					{user && <MenuItem>
						{t('shared.navbar.welcome', { username: user.username })}
					</MenuItem>}
					<MenuDivider />
					{user && <MenuItem data-cy="logout_button" onClick={handleLogout}>Logout</MenuItem>}
				</MenuList>
			</Menu>
		</>
	);
};

export default UserMenu;
