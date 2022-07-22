import { Button, Box, Flex, Spacer, Heading, useDisclosure, useToast, Container, Text, HStack } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import { getMemesAsync, selectMemes } from '../../domains/meme';
import { selectPickedMeme } from '../../domains/meme/meme.selector';
import { pickMeme } from '../../domains/meme/meme.slice';
import { deleteMemeAsync } from '../../domains/meme/meme.thunks';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux.hooks';
import { SortedTable } from '../shared/components';
import { Rec } from '../shared/components/SortedTable/SortedTable';
import ImageViewPopup from './components/ImageViewPopup';
import MemeAddButton from './components/MemeAddButton';

const headerKey = 'meme:table.header';

const MemePage: FC = (): ReactElement => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const memes = useAppSelector(selectMemes);
	const pickedMeme = useAppSelector(selectPickedMeme);
	const imageViewPopupControl = useDisclosure();
	const { onOpen } = imageViewPopupControl;
	const toast = useToast();
	const initialPageSize = 10;
	const initialPageIndex = 0;

	useEffect(() => {
		dispatch(getMemesAsync());
	}, []);

	const handleSelection = (e: any) => {
		const selectedId = e.currentTarget.dataset.id;
		dispatch(pickMeme(selectedId));
	};

	const handleDelete = (id: string, name: string) => async () => {
		await dispatch(deleteMemeAsync(id));
		toast({
			title: t('toast.title.success'),
			description: t(
				'toast.message.success.delete',
				{ entity: name },
			),
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	const DateCell = ({ value }: any) => {
		const date = new Date(value);
		const datum = date.toISOString().split('T')[0];
		const time = date.toLocaleTimeString();
		return <Text>
			{t('meme:table.value.date', { datum, time })}
		</Text>;
	};

	const ActionsCell = ({ row }: {row: any}) => {
		const { original } = row;
		return (
			<HStack
				spacing={2}
			>
				<Button
					onClick={onOpen}
					colorScheme="green"
					size="md"
					data-cy={`update_${original.name}_button`}
				>
					{t('meme:button.view')}
				</Button>
				<Button
					onClick={handleDelete(original.id, original.name)}
					colorScheme="red"
					size="md"
					data-cy={`delete_${original.name}_button`}
				>
					{t('meme:button.delete')}
				</Button>
			</HStack>
		);
	};

	const columns = useMemo<Column<Rec>[]>(() => [
		{
			Header: t(`${headerKey}.id`) as string,
			accessor: 'id',
		},
		{
			Header: t(`${headerKey}.name`) as string,
			accessor: 'name',
		},
		{
			Header: t(`${headerKey}.categories`) as string,
			accessor: 'categories',
		},

		{
			Header: t(`${headerKey}.updated_at`) as string,
			accessor: 'updatedAt',
			Cell: DateCell,
		},
		{
			Header: t(`${headerKey}.created_at`) as string,
			accessor: 'createdAt',
			Cell: DateCell,
		},
		{
			Header: t(`${headerKey}.creator_id`) as string,
			accessor: 'creatorId',
		},
		{
			// Make an expander cell
			Header: t(`${headerKey}.actions`) as string, // No header
			id: 'actions', // It needs an ID
			// eslint-disable-next-line react/prop-types
			Cell: ActionsCell,
		},
	], []);

	return (
		<Container maxW="container.xl" p={0}>
			<Box p={4}>
				<Flex pt={2} mb={8}>
					<Spacer />
					<Heading mr={4}>
						{t('meme:page.title')}
					</Heading>
					<Spacer />
					<MemeAddButton addLabelDataCy="add_user_button" />
				</Flex>
				{pickedMeme && <ImageViewPopup
					imgUrl={pickedMeme?.imgUrl || ''}
					title={pickedMeme?.name || ''}
					popupControl={imageViewPopupControl}
				/>}
				<SortedTable
					data={memes}
					columns={columns}
					onSelection={handleSelection}
					pageIndex={initialPageIndex}
					pageSize={initialPageSize}
				/>
			</Box>
		</Container>
	);
};

export default MemePage;
