import { FC, ReactElement, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import NotificationBell from './NotificationBell';
import { useRoomContext } from '../../../domains/room/context/room.context';
import FriendItem from '../../friend/components/FriendItem';

type Props = {
}

const InviteMenu: FC<Props> = (): ReactElement => {
	const { t } = useTranslation();
	const { roomState, handleCheckIfOnline, handleJoinRoom } = useRoomContext();
	const { invites } = roomState;

	useEffect(() => {
		handleCheckIfOnline(invites.map((i) => i.inviter.id));
	}, [invites]);

	return (
		<Menu>
			<MenuButton
				data-cy="user_button"
				as={Button}
				rounded="full"
				variant="link"
				cursor="pointer"
				minW={0}
			>

				<NotificationBell count={roomState.invites.length || 0} />
			</MenuButton>
			{invites.length > 0 && <MenuList zIndex={99}>
				{invites.map((invite) => {
					const { inviter, room } = invite;
					const { avatarUrl, username, id } = inviter;
					return <>
						<MenuItem>
							<FriendItem
								userName={username}
								userId={id}
								avatarUrl={avatarUrl}
							>
								<Text>
									{t('shared.invite.received', { user: inviter.username, room: room.name })}
								</Text>
								<Button
									size="sm"
									colorScheme="green"
									onClick={() => handleJoinRoom(room)}
								>
									join
								</Button>
							</FriendItem>
						</MenuItem>
						<MenuDivider />
					</>;
				})}

			</MenuList>}
		</Menu>
	);
};

export default InviteMenu;
