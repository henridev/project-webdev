const buttonStyles = {
	baseStyle: {
		fontWeight: 'normal',
	},
	sizes: {
		md: {
			h: '40px',
			fontSize: 'lg',
			px: '32px',
		},
	},
	variants: {
		primary: (/* props: { colorMode: string } */): Record<string, any> => ({
			borderRadius: '3px',
			color: 'white',
			background: 'green.500',
			maxWidth: '150px',
			height: '30px',
			py: '20px',
			px: '40px',
			_hover: {
				bg: 'green.300',
			},
		}),
		secondary: {
			borderRadius: '3px',
			color: 'primaryBlue',
			background: 'white',
			maxWidth: '150px',
			height: '30px',
			py: '20px',
			px: '40px',
			border: '1px solid',
			borderColor: 'primaryBlue',
		},
		success: {
			borderRadius: '3px',
			border: '1px solid rgb(6, 59, 158)',
			borderColor: 'green.500',
		},
		small: {
			borderRadius: '3px',
			border: '1px solid rgb(6, 59, 158)',
			borderColor: 'white',
		},
		warning: {
			borderRadius: '4px',
			color: 'primaryRed',
			background: 'white',
			maxWidth: '150px',
			height: '30px',
			py: '20px',
			px: '40px',
			border: '1px solid',
			borderColor: 'primaryRed',
		},
	},
	defaultProps: {
		size: 'md',
		variant: 'outline',
	},
};

export default buttonStyles;
