import { Container } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import Hero from './components/Hero';

const LandingPage: FC = (): ReactElement => <Container as="main" maxW="container.xl" p={4}>
	<Hero />
</Container>;

export default LandingPage;
