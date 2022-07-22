import { FC, ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { deleteFriendStatusAsync } from '../../../domains/friend/friend.thunks';

type Props = {
	friendShipId: string
}

const FriendDeleteButton: FC<Props> = (props): ReactElement => {
	const { friendShipId } = props;
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const handleClick = () => {
		dispatch(deleteFriendStatusAsync(friendShipId));
	};

	return	<Button
		w="full"
		mt={8}
		colorScheme="red"
		rounded="md"
		_hover={{
			transform: 'translateY(-2px)',
			boxShadow: 'lg',
		}}
		onClick={handleClick}
	>
		{t('friend:button.delete')}
	</Button>;
};

export default FriendDeleteButton;
