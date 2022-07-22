import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { store } from './config/store';
import theme from './config/theme';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
