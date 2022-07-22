/* eslint-disable max-len */
import { FC, ReactElement } from 'react';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, useColorModeValue, Stack, useColorMode, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { RoleEnum } from 'project-web-dev';
import { FRIEND_EP, GAME_EP, MEME_EP, USER_EP } from '../../routes/endpoints';
import { useAppSelector } from '../../../shared/hooks/redux.hooks';
import selectUser from '../../../domains/auth/auth.selector';
import checkAuthorization from '../../../shared/utils/check-authorization';
import UserMenu from './UserMenu';
import NavLink from './NavLink';
import InviteMenu from './InviteMenu';

const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Trollface_non-free.png/220px-Trollface_non-free.png';

const Links = [
	{ key: 'home', ep: '/' },
	{ key: 'users', ep: USER_EP, isAdminOnly: true },
	{ key: 'memes', ep: MEME_EP, isAdminOnly: true },
	{ key: 'friends', ep: FRIEND_EP, isLoginOnly: true },
	{ key: 'play', ep: GAME_EP, isLoginOnly: true },
];

const NavBar: FC = (): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const { t } = useTranslation();
	const user = useAppSelector(selectUser);

	const LinkComponent = Links
		.filter((link) => (!link.isLoginOnly || user))
		.filter((link) => (
			!link.isAdminOnly || checkAuthorization(user ? user.roles || [] : [], [RoleEnum.ADMIN])
		))
		.map(({ key, ep }) => (
			<NavLink key={key} to={ep}>{t(`shared.navbar.links.${key}`)}</NavLink>
		));

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems="center" justifyContent="space-between">
					<IconButton
						size="md"
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label="Open Menu"
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems="center">
						<Box>
							<Image
								boxSize="40px"
								objectFit="contain"
								src={logoUrl}
								alt="logo"
							/>
						</Box>
						<HStack
							as="nav"
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{LinkComponent}
						</HStack>
					</HStack>
					<HStack alignItems="center" justify="center" spacing={6}>
						<Button
							data-cy="toggle-theme"
							onClick={toggleColorMode}
						>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>
						{user && <InviteMenu />}
						<UserMenu />
					</HStack>
				</Flex>
				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as="nav" spacing={4}>
							{Links.map(({ key, ep }) => (
								<NavLink key={key} to={ep}>{t(`shared.navbar.links.${key}`)}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default NavBar;
