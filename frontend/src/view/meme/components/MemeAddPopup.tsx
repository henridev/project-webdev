import { FC, ReactElement, useMemo } from 'react';
import { UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
	Center,
	useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { IMeme } from 'project-web-dev';
import { PopupLayout } from '../../shared/components';
import { useImageUpload } from '../../../shared/hooks';
import UploadButton from '../../shared/components/UploadButton';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { createMemeAsync } from '../../../domains/meme/meme.thunks';

type Props = {
	popupControl: UseDisclosureProps,
}
type SubmitData = {name: string, categories:string, file: FileList}

const MemeAddPopup: FC<Props> = (props): ReactElement => {
	const { popupControl } = props;
	const dispatch = useAppDispatch();
	const toast = useToast();
	const { register, watch, formState, handleSubmit } = useForm();
	const { validateFiles, ImageComponent } = useImageUpload(watch);
	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = async (data: SubmitData) => {
		try {
			const img = data.file[0];
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { file, ...rest } = data;
			const memeInfo = ({ ...rest, memeImage: img }) as unknown as IMeme;

			const meme = await dispatch(createMemeAsync(memeInfo)).unwrap();
			if (popupControl.onClose) popupControl.onClose();
			toast({
				title: t('toast.title.success'),
				description: t('toast.message.success.create', { entity: meme.name }),
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (e: any) {
			const errorCode = (await e)?.code || 'unknown';
			const description = t(`error.code.${errorCode}`, { entity: 'user' });
			toast({
				title: t('toast.title.error'),
				description,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const inputFields = useMemo(() => [
		{
			name: 'name',
			label: t('meme:create.input.name'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
			datacy: 'name_input',
		},
		{
			name: 'categories',
			label: t('meme:create.input.categories'),
			requirements: {
				required: true,
				maxLength: 40,
				minLength: 5,
			},
			type: 'text',
			datacy: 'categories_input',
		},
	], []);

	return (
		<PopupLayout
			popupControl={popupControl}
			title={t('meme:create.title')}
			closeLabel={t('meme:create.button.close')}
			confirmLabel={t('meme:create.button.confirm')}
			confirmLabelDataCy="confirm_meme_creation_button"
			onSubmit={handleSubmit(onSubmit)}
		>
			{ImageComponent}
			{
				inputFields.map((field) => {
					const { name, label, requirements, type: fieldType, datacy } = field;
					return <FormControl
						key={datacy}
						isInvalid={errors?.[name]}
						id={name}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							{...register(name as any, requirements)}
							type={fieldType}
							data-cy={datacy}
						/>
						{errors?.[name] && <Text variant="error">
							{t(`meme:create.input-error.${name}.${errors?.[name].type}`)}
						</Text>}
					</FormControl>;
				})
			}
			<VStack>
				<FormLabel alignSelf="flex-start">{t('meme:create.input.image')}</FormLabel>
				<Center>
					<UploadButton
						label={t('meme:create.button.upload')}
						registration={register('file', { validate: validateFiles })}
					/>
				</Center>
			</VStack>
		</PopupLayout>
	);
};

MemeAddPopup.defaultProps = {
};

export default MemeAddPopup;
