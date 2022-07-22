import { FC, ReactElement, useEffect, useRef } from 'react';
import {
	List, useDisclosure, Button, DrawerContent,
	Drawer, DrawerBody, DrawerCloseButton,
	DrawerHeader, DrawerOverlay, ListItem, VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import { getUserFriendsAsync, selectFriends } from '../../../domains/friend';
import { useRoomContext } from '../../../domains/room/context/room.context';
import FriendItem from './FriendItem';

type Props = {

}

const FriendList: FC<Props> = (): ReactElement => {
	const { t } = useTranslation();
	const friends = useAppSelector(selectFriends);
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleCheckIfOnline, handleRoomInvite } = useRoomContext();
	const btnRef = useRef();

	useEffect(() => {
		dispatch(getUserFriendsAsync({ status: 'confirmed' }));
	}, []);

	useEffect(() => {
		handleCheckIfOnline(friends.map((f) => f.userId));
	}, [friends]);

	const handleInvite = (id:string, name:string) => () => handleRoomInvite({ id, name });

	return <>
		<Button ref={btnRef as any} colorScheme="teal" onClick={onOpen}>
			{t('friend:button.invite-friends')}
		</Button>
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef as any}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{t('friend:list.drawer')}</DrawerHeader>
				<DrawerBody>
					<VStack>
						<List spacing={3}>
							{friends.map((friend) => {
								const { userUsername, userId, userAvatarUrl } = friend;
								return <ListItem key={userId || userUsername}>
									<FriendItem
										userName={userUsername}
										userId={userId}
										avatarUrl={userAvatarUrl}
									>
										<Button
											size="sm"
											colorScheme="blue"
											onClick={handleInvite(userId, userUsername)}
										>
											{t('friend:button.invite')}
										</Button>
									</FriendItem>
								</ListItem>;
							})}
						</List>
						{/* <List spacing={3}>
							{friends.map((friend) => {
								const { userUsername, userId, userAvatarUrl } = friend;
								return <ListItem key={userId || userUsername}>
									<FriendItem
										userName={userUsername}
										userId={userId}
										avatarUrl={userAvatarUrl}
									>
										<Button
											size="sm"
											colorScheme="blue"
											onClick={() => handleRoomInvite({ id: userId, name: userUsername })}
										>
											{t('friend:button.invite')}
										</Button>
									</FriendItem>
								</ListItem>;
							})}
						</List> */}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	</>;
};

export default FriendList;
