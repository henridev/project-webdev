import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';
import buttonStyles from './components/button';
import headingStyles from './components/heading';
import inputStyles from './components/input';
import selectStyles from './components/select';
import textStyles from './components/text';

import colors from './foundations/colors';
import fonts from './foundations/fonts';
import sizes from './foundations/sizes';
import styles from './styles';
import menuStyles from './components/menu';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme(
	{
		styles,
		colors,
		config,
		fonts,
		sizes,
		components: {
			Input: inputStyles,
			Button: buttonStyles,
			Select: selectStyles,
			Heading: headingStyles,
			Text: textStyles,
			Menu: menuStyles,
		},
	},
	withDefaultColorScheme({
		colorScheme: 'brand',
		components: ['Button', 'Badge'],
	}),
);

export default theme;
