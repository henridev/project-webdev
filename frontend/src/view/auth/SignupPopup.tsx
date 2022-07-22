import { FC, ReactElement, useMemo } from 'react';
import {
	UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
	Button,
	Flex,
	Center,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { merge, omit } from 'lodash';
import { registerAsync } from '../../domains/auth/auth.thunks';
import { useAppDispatch } from '../../shared/hooks/redux.hooks';
import { PopupLayout, FileUpload, RandomAvatarView } from '../shared/components';
import { useRandomAvatar, useImageUpload } from '../../shared/hooks';

type Props = {popupControl: UseDisclosureProps }
type SubmitData = {username: string, email:string, password: string, file: FileList}

const SignupPopup: FC<Props> = (props): ReactElement => {
	const toast = useToast();
	const { popupControl } = props;
	const { register, handleSubmit, formState, watch } = useForm();
	const { randomAvatar, resetRandomAvatar } = useRandomAvatar();
	const { ImageComponent, validateFiles } = useImageUpload(watch);
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = async (data: SubmitData) => {
		try {
			const img = data.file[0];
			const registrationInfo = merge(omit(data, 'file'), { avatarUrl: randomAvatar, heroImage: img });
			await dispatch(registerAsync(registrationInfo)).unwrap();
		} catch (e: any) {
			const errorCode = (await e)?.code || 'unknown';
			const description = t(`error.code.${errorCode}`);
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
			name: 'email',
			label: t('auth:sign-up.input.email'),
			requirements: {
				required: true,
				maxLength: 20,
				minLength: 5,
				// eslint-disable-next-line max-len
				pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
			},
			type: 'email',
		},
		{
			name: 'username',
			label: t('auth:sign-up.input.username'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
		},
		{
			name: 'password',
			label: t('auth:sign-up.input.password'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'password',
		},
	], [t]);

	return (
		<PopupLayout
			popupControl={popupControl}
			onSubmit={handleSubmit(onSubmit)}
			title={t('auth:sign-up.title')}
			closeLabel={t('auth:sign-up.button.close')}
			confirmLabel={t('auth:sign-up.button.confirm')}
		>
			{ImageComponent}
			<Flex justify="center" m={0}>
				<RandomAvatarView
					mt={-12}
					randomAvatar={randomAvatar}
					resetRandomAvatar={resetRandomAvatar}
				/>
			</Flex>
			{
				inputFields.map((field) => {
					const { name, label, requirements, type } = field;
					return <FormControl
						isInvalid={errors?.[name]}
						id={name}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							{...register(name as any, requirements)}
							type={type}
						/>
						{errors?.[name] && <Text variant="error">
							{t(`auth:sign-up.input-error.${name}.${errors?.[name].type}`)}
						</Text>}
					</FormControl>;
				})
			}
			<FormControl
				isInvalid={errors?.file}
				id="file"
			>
				<VStack>
					<FormLabel alignSelf="flex-start">{t('auth:sign-up.input.cover')}</FormLabel>
					<Center>
						<FileUpload register={register('file', { validate: validateFiles })}>
							<Button leftIcon={<DownloadIcon />}>
								{t('auth:sign-up.button.upload')}
							</Button>
						</FileUpload>
					</Center>
				</VStack>
			</FormControl>
		</PopupLayout>
	);
};

export default SignupPopup;
