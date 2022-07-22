import { Spinner, SpinnerProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

const Loader: FC<SpinnerProps> = (props): ReactElement => (
	<Spinner
		thickness="4px"
		speed="0.65s"
		emptyColor="gray.200"
		color="blue.500"
		size="xl"
		{...{ props }}
	/>
);

export default Loader;
