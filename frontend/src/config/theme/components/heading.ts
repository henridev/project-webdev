const headingStyles = {
	// 1. We can update the base styles
	baseStyle: {
		// color: 'white',
	},
	sizes: {
		lg: {
			h: '40px',
			fontSize: 'lg',
			px: '32px',
		},
	},
	// 3. We can add a new visual variant
	variants: {
		primary: (props: { colorMode: string }): Record<string, any> => ({
			color: props.colorMode === 'dark' ? 'white' : 'black',
		}),
	},
};

export default headingStyles;
