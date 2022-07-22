import { FC, ReactElement } from 'react';
import { useTable, useSortBy, usePagination, Column } from 'react-table';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Flex,
	IconButton,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberDecrementStepper,
	NumberIncrementStepper,
	Tooltip,
	Select,
} from '@chakra-ui/react';
import {
	ChevronUpIcon,
	ChevronDownIcon,
	ArrowLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ArrowRightIcon,
} from '@chakra-ui/icons';
import { Trans, useTranslation } from 'react-i18next';

export interface Rec extends Object, Record<string, any> {}

type Props = {
	columns: Column<Rec>[]
	data: Rec[],
	pageIndex?: number,
	pageSize?: number,
	actions?: Element | ReactElement | null
	onSelection?: any
}

const CustomTable: FC<Props> = (props): ReactElement => {
	const {
		columns, data, actions, onSelection,
		pageIndex: initialPageIndex,
		pageSize: initialPageSize,
	} = props;
	const { t } = useTranslation();
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		gotoPage,
		pageOptions,
		setPageSize,
		previousPage,
		canPreviousPage,
		pageCount,
		canNextPage,
		nextPage,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: initialPageIndex, pageSize: initialPageSize },
		},
		useSortBy,
		usePagination,
	);

	// We don't want to render all 2000 rows for this example, so cap
	// it at 20 for this use case

	const renderChevron = (isSorted: boolean, isSortedDesc: boolean) => {
		if (!isSorted) return '';
		if (isSortedDesc) return <ChevronDownIcon ml={1} w={4} h={4} />;
		return <ChevronUpIcon ml={1} w={4} h={4} />;
	};

	return (
		<>
			<Table {...getTableProps()}>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								// Add the sorting props to control sorting. For this example
								// we can add them into the header props
								<Th
									userSelect="none"
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									<Flex alignItems="center">
										{column.render('Header')}
										{/* Add a sort direction indicator */}
										{renderChevron(column.isSorted || false, column.isSortedDesc || false)}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<Tr data-id={row.original?.id as number} onClick={onSelection} {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
								))}
								{actions}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
			<Flex justifyContent="space-between" m={4} alignItems="center">
				<Flex>
					<Tooltip label={t('shared.table.tooltip.first')}>
						<IconButton
							aria-label="btn"
							onClick={() => gotoPage(0)}
							isDisabled={!canPreviousPage}
							icon={<ArrowLeftIcon h={3} w={3} />}
							mr={4}
						/>
					</Tooltip>
					<Tooltip label={t('shared.table.tooltip.previous')}>
						<IconButton
							aria-label="btn"
							onClick={previousPage}
							isDisabled={!canPreviousPage}
							icon={<ChevronLeftIcon h={6} w={6} />}
						/>
					</Tooltip>
				</Flex>

				<Flex alignItems="center">
					<Text flexShrink={'0' as any} mr={8}>
						<Trans
							i18nKey="shared.table.page.pointer"
							values={{ x: pageIndex + 1, y: pageOptions.length }}
							components={[<Text fontWeight="bold" as="span" />]}
						/>
					</Text>
					<Text flexShrink={'0' as any}>{t('shared.table.page.goto')}</Text>
					<NumberInput
						ml={2}
						mr={8}
						w={28}
						min={1}
						max={pageOptions.length}
						onChange={(value) => {
							const page = value ? Number(Number(value) - 1) : 0;
							gotoPage(page);
						}}
						defaultValue={pageIndex + 1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<Select
						w={32}
						value={pageSize}
						onChange={(e: any) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{t('shared.table.show', { amount: pageSize })}
							</option>
						))}
					</Select>
				</Flex>

				<Flex>
					<Tooltip label={t('shared.table.tooltip.next')}>
						<IconButton
							aria-label="btn"
							onClick={nextPage}
							isDisabled={!canNextPage}
							icon={<ChevronRightIcon h={6} w={6} />}
						/>
					</Tooltip>
					<Tooltip label={t('shared.table.tooltip.last')}>
						<IconButton
							aria-label="btn"
							onClick={() => gotoPage(pageCount - 1)}
							isDisabled={!canNextPage}
							icon={<ArrowRightIcon h={3} w={3} />}
							ml={4}
						/>
					</Tooltip>
				</Flex>
			</Flex>
		</>
	);
};

CustomTable.defaultProps = {
	actions: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onSelection: () => {},
	pageSize: 10,
	pageIndex: 0,
};

export default CustomTable;
