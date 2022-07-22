import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Table, Tbody, TableCaption } from '@chakra-ui/react';
import TableHead from './components/TableHead';

interface IProps<T> {
	datas: T[],
	titles: { label:string, title?:string }[],
	caption: string
	// eslint-disable-next-line no-unused-vars
	displayData: (data: T, index?: number) => ReactNode;
}

const TableComponent = <T extends Record<string, any>>(props: PropsWithChildren<IProps<T>>): ReactElement => {
	const { titles, datas, displayData, caption } = props;
	return (
		<Table variant="simple" mt={4} maxW="75vw">
			<TableCaption>{caption}</TableCaption>
			<TableHead titles={titles} />
			<Tbody>
				{datas.map(displayData)}
			</Tbody>
			<TableHead titles={titles} isFooter />
		</Table>
	);
};

export default TableComponent;
