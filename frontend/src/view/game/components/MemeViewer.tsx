import { FC, memo, ReactElement } from 'react';
import { Text, Image, Container, Heading, HStack } from '@chakra-ui/react';
import { useRoomContext } from '../../../domains/room/context/room.context';

const MemeViewer: FC = (): ReactElement => {
	const { roomState } = useRoomContext();
	return roomState.meme.memeUrl ? <Container
		position="relative"
		maxH="600px"
		rounded="2xl"
		boxShadow="2xl"
		width="full"
		overflow="hidden"
	>
		<Text
			aria-label="Play Button"
			variant="ghost"
			_hover={{ bg: 'transparent' }}
			size="lg"
			fontSize="30px"
			color="green.400"
			position="absolute"
			bg="white"
			rounded="md"
			p={2}
			left="50%"
			top="90%"
			transform="translateX(-50%) translateY(-50%)"
		>
			{roomState.meme.memeName}
		</Text>
		<Image
			alt="Hero Image"
			fit="contain"
			align="center"
			src={roomState.meme.memeUrl}
		/>
	</Container> : <Container w="full" minH="500px" textAlign="center">
		<HStack justify="center" align="center">
			<Heading color="green.200">
				What do
			</Heading>
			<Heading
				color="purple.600"
			>
				you
			</Heading>
		</HStack>
		<HStack justify="center" align="center">
			<Heading color="purple.300">
				meme
			</Heading>
			<Heading color="purple.600">
				?
			</Heading>
		</HStack>
		<HStack mt={10} justify="center" align="center">
			<Heading color="pink.200">
				waiting for the first meme ...
			</Heading>
		</HStack>
	</Container>;
};

export default memo(MemeViewer);
