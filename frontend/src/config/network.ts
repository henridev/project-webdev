import ky from 'ky';

const { REACT_APP_API_BASE_URL = 'http://localhost:4000' } = process.env;

const api = ky.create({ prefixUrl: `${REACT_APP_API_BASE_URL}/api` }).extend({
	hooks: {
		beforeRequest: [
			async (request) => {
				request.headers.set('X-Requested-With', 'ky');
				// attach auth
				const jwt = localStorage.getItem('token');
				request.headers.set('Authorization', `Bearer ${jwt}`);
			},
		],
	},
	credentials: 'include',
});

export default api;
