import { FC, ReactElement } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, IconButton, forwardRef, AvatarProps } from '@chakra-ui/react';

type Props = {
	// eslint-disable-next-line react/no-unused-prop-types
	randomAvatar: string,
	resetRandomAvatar: () => void
}

const RandomAvatarView: FC<Props> = (props): ReactElement => {
	const { resetRandomAvatar } = props;
	return (
		<AvatarBadge
			as={IconButton}
			size="sm"
			rounded="full"
			top="-10px"
			aria-label="remove Image"
			backgroundColor="green.500"
			icon={<ChevronRightIcon onClick={resetRandomAvatar} />}
		/>
	);
};

export default forwardRef<Props & AvatarProps, 'div'>((props, ref) => <Avatar
	{...props}
	ref={ref}
	size="xl"
	src={props.randomAvatar}
>
	<RandomAvatarView {...props} />
</Avatar>);
