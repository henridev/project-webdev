import { BellIcon } from '@chakra-ui/icons';
import { AvatarBadge, Avatar, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type Props = {count: number}

const NotificationBell: FC<Props> = (props): ReactElement => {
	const color = useColorModeValue('black', 'white');
	const { count = 0 } = props;
	return <Avatar size="sm" icon={<BellIcon color={color} fontSize={30} />} bg="transparent">
		<AvatarBadge boxSize="1.5em" bg="red.500" color="white">{count}</AvatarBadge>
	</Avatar>;
};

export default NotificationBell;
