import { FC, memo, ReactElement } from 'react';
import { Center, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CreateRoomInput from './components/CreateRoomInput';

const GameCreationPage: FC = (): ReactElement => {
	const { t } = useTranslation();

	return <Container minH="70vh" p={10}>
		<VStack p={4} spacing={10} justify="center" align="center" h="full">
			<Heading>{t('game:creation-page.title')}</Heading>
			<Text fontSize="xl" textAlign="center">
				{t('game:creation-page.banner')}
			</Text>
			<Center w="full" bg="green.500" h="100px" color="white" px={8} rounded="md">
				<CreateRoomInput />
			</Center>
		</VStack>
	</Container>;
};

export default memo(GameCreationPage);
