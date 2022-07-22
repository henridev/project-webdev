import { Badge, Text, HStack, Avatar } from '@chakra-ui/react';
import { includes, some } from 'lodash';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../../domains/room/context/room.context';

type Props = {
	userName: string
	userId: string
	avatarUrl: string
}

const colorMap: Record<string, any> = {
	play: 'orange',
	online: 'green',
	offline: 'red',
	inRoom: 'cyan',
};

const FriendItem: FC<Props> = (props): ReactElement => {
	const { userId, userName, avatarUrl, children } = props;
	const { roomState } = useRoomContext();
	const { t } = useTranslation();
	const isInRoom = some(roomState.usersInCurrentRoom, ['id', userId]);
	const isOnline = !isInRoom && includes(roomState.friendsOnline, userId);
	const isPlaying = !isOnline && includes(roomState.usersInRooms, userId);

	const status = Object.entries({
		inRoom: isInRoom,
		play: isPlaying,
		online: isOnline,
		offline: !isPlaying && !isOnline,
	}).find(([, v]) => !!v)?.[0] || '';

	return <HStack spacing={4}>
		<Avatar size="sm" name={userName} src={avatarUrl} />
		<Text>{userName}</Text>
		<Badge colorScheme={colorMap[status]}>{t(`friend:list.status.${status}`)}</Badge>
		{children}
	</HStack>;
};

FriendItem.defaultProps = {
};

export default FriendItem;

// export default ;
