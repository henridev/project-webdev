/* eslint-disable no-useless-escape */
const menuStyles = {
	parts: ['menu', 'item', 'button', 'list'],
	baseStyle: {
	},
	sizes: {
		sm: {
			item: {
				fontSize: '0.75rem',
				px: 2,
				py: 1,
			},
		},
		md: {
			item: {
				fontSize: '0.875rem',
				px: 3,
				py: 2,
			},
		},
	},
	variants: {
		action: {
			menu: {
			},
			item: {
				color: 'white',
				'&:hover': {
					backgroundColor: 'primaryRed',
				},
				'&:active': {
					backgroundColor: 'primaryRed',
				},
				'&:focus': {
					backgroundColor: 'primaryRed',
				},
				py: '2',
			},
			list: {
				backgroundColor: 'primaryBlue',

			},
			button: {
				border: 'none',
				'&:hover': {
					backgroundColor: 'none',
				},
				'&:active': {
					backgroundColor: 'none',
				},
				'&:focus': {
					backgroundColor: 'none',
				},
			},
		},
	},
};

export default menuStyles;
