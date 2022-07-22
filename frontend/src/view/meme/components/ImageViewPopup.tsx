import { FC, ReactElement } from 'react';
import { UseDisclosureProps, Image } from '@chakra-ui/react';
import { PopupLayout } from '../../shared/components';

type Props = {
	popupControl: UseDisclosureProps,
	imgUrl: string,
	title: string,
}

const ImageViewPopup: FC<Props> = (props): ReactElement => {
	const { popupControl, imgUrl, title } = props;

	return (
		<PopupLayout
			popupControl={popupControl}
			title={title}
			confirmLabelDataCy="confirm_meme_creation_button"
			onSubmit={undefined}
		>
			<Image src={imgUrl} alt="meme" />
		</PopupLayout>
	);
};

ImageViewPopup.defaultProps = {
};

export default ImageViewPopup;
