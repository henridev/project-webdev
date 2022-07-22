import { mode } from '@chakra-ui/theme-tools';

// Global style overrides
const styles = {
	global: (props: any): Record<string, any> => ({
		body: {
			fontFamily: 'body',
			color: mode('gray.800', 'whiteAlpha.900')(props),
			bg: mode('white', 'gray.800')(props),
			lineHeight: 'base',
		},
	}),
};

export default styles;
