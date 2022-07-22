import { useEffect, useState } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { Image, ImageProps } from '@chakra-ui/react';

const useImageUpload = (watch: UseFormWatch<FieldValues>, fieldValue = 'file', imageProps: ImageProps = {}): {
    selectedImage: Blob | MediaSource | null;
    validateFiles: (value: FileList) => true | 'Files is required' | 'Max file size 10mb';
    ImageComponent: JSX.Element | null;
} => {
	const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(null);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === fieldValue) {
				setSelectedImage(value?.[name][0]);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const validateFiles = (value: FileList) => {
		if (value.length < 1) {
			return 'Files is required';
		}
		// eslint-disable-next-line no-restricted-syntax
		for (const file of Array.from(value)) {
			const fsMb = file.size / (1024 * 1024);
			const MAX_FILE_SIZE = 10;
			if (fsMb > MAX_FILE_SIZE) {
				return 'Max file size 10mb';
			}
		}
		return true;
	};

	const ImageComponent = selectedImage ? <Image
		rounded="md"
		h="200px"
		w="full"
		src={URL.createObjectURL(selectedImage)}
		objectFit="cover"
		{...imageProps}
	/> : null;

	return {
		selectedImage,
		validateFiles,
		ImageComponent,
	};
};

export default useImageUpload;
