import { FC, memo, ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../../domains/room/context/room.context';

const LeaveRoom: FC = (): ReactElement => {
	const { t } = useTranslation();
	const { handleLeaveRoom } = useRoomContext();

	return <Button p={4} colorScheme="red" onClick={() => handleLeaveRoom()}>
		{t('game:button.leave-room')}
	</Button>;
};

export default memo(LeaveRoom);
