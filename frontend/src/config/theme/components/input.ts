const inputStyles = {
	variants: {
		primary: (/* props: { colorMode: string } */): Record<string, any> => ({
			// color: props.colorMode === 'dark' ? 'white' : 'black',
			field: {
				padding: '20px',
				background: '',
				_focus: {
					borderColor: 'blue.500',
				},
			},
		}),
	},
	sizes: {
		md: {
			field: {
				borderRadius: 'none',
			},
		},
	},
};

export default inputStyles;
