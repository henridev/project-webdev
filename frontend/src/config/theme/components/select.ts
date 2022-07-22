const selectStyles = {
	variants: {
		primary: {
			field: {
				borderBottom: '2px solid rgb(162, 172, 189)',
				background: 'primaryGrey',
				_focus: {
					borderColor: 'primaryBlue',
				},
			},
		},
	},
	sizes: {
		md: {
			field: {
				borderRadius: 'none',
			},
		},
	},
};

export default selectStyles;
