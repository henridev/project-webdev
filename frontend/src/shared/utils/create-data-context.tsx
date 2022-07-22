// import React, { createContext, FC, ReactElement, Reducer, ReducerWithoutAction, useReducer, ReducerStateWithoutAction } from 'react';

// function createDataContext<R extends ReducerWithoutAction<ReturnType<R>>, A, D extends ReducerStateWithoutAction<ReturnType<R>>>(reducer: R, actions: A, defaultValue: D) {
// 	const DataContext = () => {
// 		const Context = createContext({});

// 		const Provider: FC = ({ children }) => {
// 			const [state, dispatch] = useReducer(reducer, defaultValue);

// 			const boundActions = {};

// 			for (const key in actions) {
// 				boundActions[key] = actions[key](dispatch);
// 			}

// 			return (
// 				<Context.Provider value={{ state, ...boundActions }}>
// 					{children}
// 				</Context.Provider>
// 			);
// 		};

// 		return { Context, Provider };
// 	};
// 	return DataContext();
// }
// // import createDataContext from './createDataContext';

// enum ChatActions {
//   MESSAGE = 'MESSAGE',
// }

// // An interface for our actions
// interface ChatAction {
//   type: ChatActions;
//   payload: number;
// }

// // An interface for our state
// interface ChatState {
//   messages: number;
// }

// const chatReducer = (state: ChatState, action: ChatAction) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 	default:
// 		return state;
// 	}
// };

// const Counter = () => {
// 	const [state, dispatch] = useReducer(chatReducer, { messages: 0 });
// 	return null;
// };

// export const { Provider, Context } = createDataContext(
// 	chatReducer,
// 	{},
// 	{ isSignedIn: false },
// );

export const test = '';
