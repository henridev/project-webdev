import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserPopup from './UserPopup';

type Props = {
	addLabelDataCy?: string
}

const UserAddButton: FC<Props> = (props): ReactElement => {
	const postCreationPopupControl = useDisclosure();
	const { isOpen, onOpen } = postCreationPopupControl;
	const { addLabelDataCy } = props;
	const { t } = useTranslation();

	return (
		<>
			{isOpen && <UserPopup popupControl={postCreationPopupControl} />}
			<ButtonGroup onClick={onOpen} size="sm" colorScheme="green" isAttached variant="outline">
				<Button data-cy={addLabelDataCy} rightIcon={<AddIcon />} mr="-px" size="md">
					{t('user:button.create')}
				</Button>
			</ButtonGroup>
		</>
	);
};

UserAddButton.defaultProps = {
	addLabelDataCy: '',
};

export default UserAddButton;
