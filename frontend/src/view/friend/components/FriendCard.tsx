import { FC, ReactElement } from 'react';
import {
	Heading,
	Avatar,
	Box,
	Center,
	Image,
	Flex,
	Text,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { IFriendshipDTO } from 'project-web-dev';
import FriendConfirmButton from './FriendConfirmButton';
import FriendDeleteButton from './FriendDeleteButton';
import { useAppSelector } from '../../../shared/hooks/redux.hooks';
import { selectUser } from '../../../domains/auth';

type Props = {
	friend: IFriendshipDTO
}

const FriendCard: FC<Props> = (props): ReactElement => {
	const user = useAppSelector(selectUser);
	const { friend } = props;
	const { userAvatarUrl, userUsername, userEmail, userHeroUrl, friendStatus, friendFriendOneId, friendId } = friend;

	const isCurrentUserRequester = friendFriendOneId === user?.id;
	const isPending = friendStatus === 'pending';

	return 	<Center py={6}>
		<Box
			maxW="270px"
			minW="270px"
			w="full"
			bg={useColorModeValue('white', 'gray.800')}
			boxShadow="2xl"
			rounded="md"
			overflow="hidden"
		>
			{userHeroUrl && <Image
				h="120px"
				w="full"
				src={userHeroUrl}
				objectFit="cover"
			/>}
			<Flex justify="center" mt={-12}>
				<Avatar
					size="xl"
					src={userAvatarUrl}
					alt="Author"
					css={{
						border: '2px solid white',
					}}
				/>
			</Flex>

			<Box p={6}>
				<Stack spacing={0} align="center" mb={5}>
					<Heading variant="primary" fontSize="2xl" fontWeight={500} fontFamily="body">
						{userUsername}
					</Heading>
					<Text color="gray.500">{userEmail}</Text>
				</Stack>
				{
					isPending && <FriendConfirmButton
						friendShipId={friendId}
						disabled={isCurrentUserRequester}
						colorScheme={isCurrentUserRequester ? 'orange' : 'green'}
						label={isCurrentUserRequester ? 'Pending approval' : 'Accept request'}
					/>
				}
				{
					!isPending && <FriendDeleteButton
						friendShipId={friendId}
					/>
				}
			</Box>
		</Box>
	</Center>;
};

export default FriendCard;
