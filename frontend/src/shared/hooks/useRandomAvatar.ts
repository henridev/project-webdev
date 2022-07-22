import { useState } from 'react';

// eslint-disable-next-line max-len
const getRandomAvatar = () => `https://avatars.dicebear.com/api/${Math.random() < 0.5 ? 'adventurer' : 'avataaars'}/${Math.random()}.svg`;

const useRandomAvatar = (initRandom = true): {
	randomAvatar: string;
	resetRandomAvatar: () => void;
} => {
	const [randomAvatar, setRandomAvatar] = useState(initRandom ? getRandomAvatar() : '');

	const resetRandomAvatar = () => {
		setRandomAvatar(getRandomAvatar());
	};

	return {
		randomAvatar,
		resetRandomAvatar,
	};
};

export default useRandomAvatar;
