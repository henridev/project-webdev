import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { updateFriendStatusAsync } from '../../../domains/friend/friend.thunks';

type Props = {
	friendShipId: string
	label?: string
}

const FriendConfirmButton = forwardRef<Props & ButtonProps, 'button'>((props, ref) => {
	const { friendShipId, label } = props;
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(updateFriendStatusAsync(friendShipId, 'confirmed'));
	};

	return	<Button
		ref={ref}
		w="full"
		mt={8}
		colorScheme="green"
		{...props}
		rounded="md"
		_hover={{
			transform: 'translateY(-2px)',
			boxShadow: 'lg',
		}}
		onClick={handleClick}
	>
		{label}
	</Button>;
});

FriendConfirmButton.defaultProps = {
	label: 'Accept request',
};

export default FriendConfirmButton;

// export default ;
