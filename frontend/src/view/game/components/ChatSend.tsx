import { FC, memo, ReactElement } from 'react';
import {
	Button, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useRoomContext } from '../../../domains/room/context/room.context';

type Fields = {
	message: string
}

const ChatSend: FC = (): ReactElement => {
	const { t } = useTranslation();
	const { handleSendChatMessage } = useRoomContext();
	const { register, handleSubmit, reset } = useForm();

	const onClickHandler = (fields: Fields) => {
		handleSendChatMessage(fields.message);
		reset({ message: '' });
	};

	return <InputGroup size="md">
		<Input
			pl="10px"
			pr="150px"
			type="text"
			variant="flushed"
			placeholder={t('game:input.message-placeholder')}
			{...register('message', { required: true, max: 100 })}
		/>
		<InputRightElement pr={2} minW="140px">
			<Button
				_hover={{
					transform: 'translateY(-2px)',
					boxShadow: 'lg',
				}}
				h="1.75rem"
				size="md"
				variant="small"
				colorScheme="blue"
				color="white"
				zIndex={0}
				onClick={handleSubmit<Fields>(onClickHandler)}
			>
				{t('game:button.send-message')}
			</Button>
		</InputRightElement>

	</InputGroup>;
};

export default memo(ChatSend);
