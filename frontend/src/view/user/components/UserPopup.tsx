import { FC, ReactElement, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
	Center,
	useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IUser } from 'project-web-dev';
import { PopupLayout, RandomAvatarView } from '../../shared/components';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { createUserAsync, updateFullUserAsync } from '../../../domains/user/user.thunks';
import { useRandomAvatar } from '../../../shared/hooks';

type Props = {
	popupControl: UseDisclosureProps,
	defaultValues?: Record<string, any>,
	type?: 'create' | 'update'
}

const UserPopup: FC<Props> = (props): ReactElement => {
	const toast = useToast();
	const dispatch = useAppDispatch();
	const { popupControl, defaultValues, type } = props;
	const { randomAvatar, resetRandomAvatar } = useRandomAvatar(type === 'create');
	const { register, handleSubmit, formState } = useForm({
		defaultValues,
	});

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = async (data: IUser) => {
		try {
			const payload = { ...data, avatarUrl: randomAvatar || data.avatarUrl };
			// unwrap property, if available, payload created by rejectWithValue from a rejected action:
			const user = await dispatch(
				type === 'create'
					? createUserAsync(payload)
					: updateFullUserAsync(payload),
			).unwrap();
		if (popupControl.onClose) popupControl.onClose();
			toast({
				title: t('toast.title.success'),
				description: t(`toast.message.success.${type}`, { entity: user.username }),
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
			name: 'username',
			label: t(`user:${type}.input.username`),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
			datacy: 'username_input',
		},
		{
			name: 'email',
			label: t(`user:${type}.input.email`),
			requirements: {
				required: true,
				maxLength: 40,
				minLength: 5,
				// eslint-disable-next-line max-len
				pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
			},
			type: 'text',
			datacy: 'email_input',
		},
		...type === 'create' ? [{
			name: 'password',
			label: t(`user:${type}.input.password`),
			requirements: { required: true, maxLength: 20, minLength: 5 },
			type: 'password',
			datacy: 'password_input',
		}] : [],
	], [type]);

	return (
		<PopupLayout
			popupControl={popupControl}
			onSubmit={handleSubmit(onSubmit)}
			title={t(`user:${type}.title`)}
			closeLabel={t(`user:${type}.button.close`)}
			confirmLabel={t(`user:${type}.button.confirm`)}
			confirmLabelDataCy="confirm_user_creation_button"
		>
			<Center>
				<RandomAvatarView
					randomAvatar={randomAvatar && type === 'update' ? randomAvatar : defaultValues?.avatar_url}
					resetRandomAvatar={resetRandomAvatar}
				/>
			</Center>
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
							{t(`user:${type}.input-error.${name}.${errors?.[name].type}`)}
						</Text>}
					</FormControl>;
				})
			}
		</PopupLayout>
	);
};

UserPopup.defaultProps = {
	defaultValues: {},
	type: 'create',
};

export default UserPopup;
