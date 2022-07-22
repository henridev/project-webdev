import {
	Box,
	Heading,
	Container,
	Text,
	Button,
	Stack,
} from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const Hero: FC = (): ReactElement => {
	const { t } = useTranslation();

	return <Container maxW="3xl">
		<Stack
			as={Box}
			textAlign="center"
			spacing={{ base: 8, md: 14 }}
			py={{ base: 20, md: 36 }}
		>
			<Heading
				variant="primary"
				fontWeight={600}
				fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
				lineHeight="110%"
			>
				{t('shared.landing.question')}
				<br />
				<Text as="span" color="green.400">
					meme?
				</Text>
			</Heading>
			<Text color="gray.500">
				{t('shared.landing.description')}
			</Text>
			<Stack
				direction="column"
				spacing={3}
				align="center"
				alignSelf="center"
				position="relative"
			>
				<Button
					variant="primary"
				>
					{t('shared.landing.button')}
				</Button>
			</Stack>
		</Stack>
	</Container>;
};

export default Hero;
