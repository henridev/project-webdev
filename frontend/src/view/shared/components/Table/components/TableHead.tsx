import { FC, HTMLProps, ReactElement } from 'react';
import { Thead, Tfoot, Tr, Th } from '@chakra-ui/react';

type Props = {
	titles: {title?:string, label:string, isNumeric?: boolean}[]
	isFooter?: boolean
} & Partial<HTMLProps<HTMLHeadElement>>

const TableHead: FC<Props> = (props): ReactElement => {
	const { titles, isFooter } = props;
	const Head = ({ children }: any) => (isFooter
		? <Tfoot>
			{children}
		</Tfoot>
		: <Thead>
			{children}
		</Thead>);

	return (
		<Head>
			<Tr>
				{titles.map((t) => {
					const { title, label, isNumeric } = t;
					return <Th isNumeric={isNumeric} key={label || title}>{label}</Th>;
				})}
			</Tr>
		</Head>
	);
};

TableHead.defaultProps = {
	isFooter: false,
};

export default TableHead;
