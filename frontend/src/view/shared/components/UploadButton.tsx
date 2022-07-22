import { DownloadIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import FileUpload from './FileUpload';

type Props = {
	registration: UseFormRegisterReturn
	label: string
}
const UploadButton: FC<Props> = (props): ReactElement => {
	const { registration, label } = props;
	return <FileUpload register={registration}>
		<Button leftIcon={<DownloadIcon />}>
			{label}
		</Button>
	</FileUpload>;
};

export default UploadButton;
