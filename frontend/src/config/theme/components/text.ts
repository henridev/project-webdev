const textStyles = {
	// 3. We can add a new visual variant
	variants: {
		label: {
			color: 'brand.300',
			fontWeight: '600',
		},
		info: {
			color: 'secondaryGrey',
			fontWeight: '300',
		},
		error: {
			color: 'error',
			fontSize: 'xs',
		},
		subtitle: (props: { colorMode: string }): Record<string, any> => ({
			bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
		}),
	},
};

export default textStyles;
