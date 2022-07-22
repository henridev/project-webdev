import localForage from 'localforage';

const localforageStore = localForage.createInstance({
	name: 'app-storage',
	version: 1.0,
});

export enum storageKeys {
	user = 'user',
	token = 'token',
	room = 'room',
}

export function getStoredJSON<T extends Record<string, any>>(key: storageKeys): T {
	const value = localStorage.getItem(key) as string;
	return JSON.parse(value);
}

export const setStoredJSON = (key: storageKeys, val: Record<string, any>): void => {
	localStorage.setItem(key, JSON.stringify(val));
};

export default localforageStore;
