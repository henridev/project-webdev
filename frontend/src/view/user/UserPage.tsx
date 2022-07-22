import { Button, Box, Flex, Spacer, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import { getUsersAsync, selectUsers } from '../../domains/user';
import { selectPickedUser } from '../../domains/user/user.selector';
import { pickUser } from '../../domains/user/user.slice';
import { deleteUserAsync } from '../../domains/user/user.thunks';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux.hooks';
import { SortedTable } from '../shared/components';
import { Rec } from '../shared/components/SortedTable/SortedTable';
import UserAddButton from './components/UserAddButton';
import UserPopup from './components/UserPopup';

const headerKey = 'user:table.header';

const UserPage: FC = (): ReactElement => {
	const toast = useToast();
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsers);
	const pickedUser = useAppSelector(selectPickedUser);
	const userUpdatePopupControl = useDisclosure();
	const { t } = useTranslation();
	const { isOpen, onOpen } = userUpdatePopupControl;
	const initialPageSize = 10;
	const initialPageIndex = 0;

	useEffect(() => {
		dispatch(getUsersAsync());
	}, []);

	const handleSelection = (e: any) => {
		const selectedId = e.currentTarget.dataset.id;
		dispatch(pickUser(selectedId));
	};

	const handleDelete = (id: string, username: string) => async () => {
		await dispatch(deleteUserAsync(id));
		toast({
			title: t('toast.title.success'),
			description: t(
				'toast.message.success.delete',
				{ entity: username },
			),
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	const ActionCell = ({ row }: {row: any}) => {
		const { original } = row || {};
		return (
			<Box
				p={2}
				color="white"
			>
				<Button
					onClick={onOpen}
					colorScheme="yellow"
					size="md"
					mr={4}
					data-cy={`update_${original.username}_button`}
				>
					{t('user:button.update')}
				</Button>
				<Button
					onClick={handleDelete(original.id, original.username)}
					colorScheme="red"
					size="md"
					mr={4}
					data-cy={`delete_${original.username}_button`}
				>
					{t('user:button.delete')}
				</Button>
			</Box>
		);
	};

	const columns = useMemo<Column<Rec>[]>(() => [
		{
			Header: t(`${headerKey}.identification`) as string,
			columns: [
				{
					Header: t(`${headerKey}.id`),
					accessor: 'id',
				},
				{
					Header: t(`${headerKey}.username`),
					accessor: 'username',
				},
				{
					Header: t(`${headerKey}.email`),
					accessor: 'email',
				},
			],
		},
		{
			Header: t(`${headerKey}.authorization`) as string,
			columns: [
				{
					Header: t(`${headerKey}.roles`),
					accessor: 'roles',
				},
			],
		},
		{
			// Make an expander cell
			Header: t(`${headerKey}.actions`) as string, // No header
			id: 'actions', // It needs an ID
			// eslint-disable-next-line react/prop-types
			Cell: ActionCell,
		},
	], []);

	return (
		<Box p={4}>
			<Flex pt={2} mb={8}>
				<Spacer />
				<Heading mr={4}>{t('user:page.title')}</Heading>
				<Spacer />
				<UserAddButton addLabelDataCy="add_user_button" />
			</Flex>
			{isOpen && <UserPopup
				type="update"
				defaultValues={pickedUser}
				popupControl={userUpdatePopupControl}
			/>}
			<SortedTable
				data={users}
				columns={columns}
				onSelection={handleSelection}
				pageIndex={initialPageIndex}
				pageSize={initialPageSize}
			/>
		</Box>
	);
};

export default UserPage;
