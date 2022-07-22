import { FC } from 'react';
import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

const NavLink: FC<{to: string}> = (props) => {
	const { children, to } = props;
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<Link
			px={2}
			py={1}
			rounded="md"
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
		>
			<LinkRouter to={to}>
				{children}
			</LinkRouter>
		</Link>
	);
};

export default NavLink;
