import { FC, ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MemeAddPopup from './MemeAddPopup';

type Props = {
	addLabelDataCy?: string
}

const MemeAddButton: FC<Props> = (props): ReactElement => {
	const postCreationPopupControl = useDisclosure();
	const { isOpen, onOpen } = postCreationPopupControl;
	const { addLabelDataCy } = props;
	const { t } = useTranslation();

	useEffect(() => {
	// dispatch(getAllPostsAsync());
	}, []);

	return (
		<>
			{isOpen && <MemeAddPopup popupControl={postCreationPopupControl} />}
			<ButtonGroup onClick={onOpen} size="sm" colorScheme="green" isAttached variant="outline">
				<Button data-cy={addLabelDataCy} rightIcon={<AddIcon />} mr="-px" size="md">
					{t('user:button.create')}
				</Button>
			</ButtonGroup>
		</>
	);
};

MemeAddButton.defaultProps = {
	addLabelDataCy: '',
};

export default MemeAddButton;
