import { FC, ReactElement } from 'react';
import {
	UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { loginAsync } from '../../domains/auth/auth.thunks';
import { useAppDispatch } from '../../shared/hooks/redux.hooks';
import { PopupLayout } from '../shared/components';

type Props = {popupControl: UseDisclosureProps }

const LoginPopup: FC<Props> = (props): ReactElement => {
	const { popupControl } = props;
	const toast = useToast();
	const { register, handleSubmit, formState } = useForm();
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = async (data: any) => {
		try {
			await dispatch(loginAsync(data)).unwrap();
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

	const inputFields = [
		{
			name: 'username',
			label: t('auth:login.input.username'),
			requirements: { required: true, maxLength: 20, minLength: 3 },
			type: 'text',
			datacy: 'username_input',
		},
		{
			name: 'password',
			label: t('auth:login.input.password'),
			requirements: { required: true, maxLength: 20, minLength: 3 },
			type: 'password',
			datacy: 'password_input',
		},
	];

	return (
		<PopupLayout
			popupControl={popupControl}
			onSubmit={handleSubmit(onSubmit)}
			title={t('auth:login.title')}
			closeLabel={t('auth:login.button.close')}
			confirmLabel={t('auth:login.button.confirm')}
			confirmLabelDataCy="login_submit_button"
		>
			{
				inputFields.map((field) => {
					const { name, label, requirements, type, datacy } = field;
					return <FormControl
						isInvalid={errors?.[name]}
						id={name}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							{...register(name as any, requirements)}
							type={type}
							data-cy={datacy}
						/>
						{errors?.[name] && <Text variant="error">
							{t(`auth:login.input-error.${name}.${errors?.[name].type}`)}
						</Text>}
					</FormControl>;
				})
			}
		</PopupLayout>
	);
};

export default LoginPopup;
