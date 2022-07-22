import { FC, ReactElement } from 'react';
import { Button, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { createFriendRequestAsync } from '../../../domains/friend/friend.thunks';

type Fields = {
	username:string
}

const FriendRequestField: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const toast = useToast();
	const { t } = useTranslation();
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;

	const handleFriendRequest = async (data: Fields) => {
		try {
			await dispatch(createFriendRequestAsync(data.username)).unwrap();
		} catch (e: any) {
			const errorCode = (await e)?.code || 'unknown';
			const description = t(`error.code.${errorCode}`, { entity: `user ${data.username}` });
			toast({
				title: t('toast.title.error'),
				description,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return <VStack>
		<InputGroup size="md">
			<Input
				pr="120px"
				type="text"
				variant="flushed"
				placeholder={t('friend:create.placeholder')}
				isInvalid={errors?.username}
				{...register('username', { required: true, max: 20 })}
			/>
			<InputRightElement pr={2} minW="100px">
				<Button
					_hover={{
						transform: 'translateY(-2px)',
						boxShadow: 'lg',
					}}
					h="1.75rem"
					size="sm"
					variant="small"
					colorScheme="blue"
					zIndex={0}
					onClick={handleSubmit<Fields>(handleFriendRequest)}
				>
					{t('friend:button.send-request')}
				</Button>
			</InputRightElement>

		</InputGroup>
		{errors?.username && <Text variant="error">
			{t(`friend:create.input-error.username.${errors?.username.type}`)}
		</Text>}
	</VStack>;
};

export default FriendRequestField;
