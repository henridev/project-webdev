import { FC, memo, ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../../domains/room/context/room.context';

const NewMeme: FC = (): ReactElement => {
	const { t } = useTranslation();
	const { handleNewMeme } = useRoomContext();

	return <Button p={4} colorScheme="green" onClick={() => handleNewMeme()}>
		{t('game:button.new-meme')}
	</Button>;
};

export default memo(NewMeme);
