import { ChangeEventHandler, FC, memo, MouseEventHandler, ReactElement } from 'react';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../../domains/room/context/room.context';
import { RoomActions } from '../../../domains/room/room.types';

const CreateRoomInput: FC = (): ReactElement => {
	const { t } = useTranslation();

	const {
		dispatch,
		handleCreateRoom,
		roomState,
	} = useRoomContext();

	const handleRoomNameChange: ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
		dispatch({ type: RoomActions.CHANGE_ROOM_NAME, payload: event.target.value });
	};

	const handleRoomCreation: MouseEventHandler<HTMLButtonElement> | undefined = () => {
		handleCreateRoom();
	};

	return 	<InputGroup size="md" maxW="500px">
		<Input
			type="text"
			variant="flushed"
			value={roomState.room.name}
			placeholder={t('game:creation-page.input')}
			onChange={handleRoomNameChange}
		/>
		<InputRightElement pr={2} minW="130px">
			<Button
				_hover={{
					transform: 'translateY(-2px)',
					boxShadow: 'lg',
				}}
				h="1.75rem"
				variant="small"
				colorScheme="blue"
				onClick={handleRoomCreation}
			>
				{t('game:button.create-room')}
			</Button>
		</InputRightElement>
	</InputGroup>;
};

export default memo(CreateRoomInput);
