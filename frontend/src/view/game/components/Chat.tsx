/* eslint-disable react/no-array-index-key */
import { FC, memo, ReactElement, useEffect, useRef } from 'react';
import {
	Accordion, AccordionButton, AccordionIcon, AccordionItem,
	AccordionPanel, Box, Heading, Text, List, ListItem, HStack, useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRoomContext } from '../../../domains/room/context/room.context';
import ChatSend from './ChatSend';

const colorMap = {
	join: 'green.500',
	chat: 'blue.200',
	leave: 'red.300',
	created: 'purple.300',
};

const Chat: FC = (): ReactElement => {
	const { t } = useTranslation();
	const { roomState } = useRoomContext();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const bg = useColorModeValue('gray.600', 'gray.600');

	const scrollToBottom = () => {
		messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [roomState.messages]);

	return <Accordion allowToggle w="full" backgroundColor={bg} rounded="md" defaultIndex={0}>
		<AccordionItem>
			<Heading as="h2" color="blue.300">
				<AccordionButton>
					<Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
						{t('game:game-page.chat', { name: roomState.room.name })}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</Heading>
			<AccordionPanel pb={4}>
				<List spacing={3} maxH="500px" overflowY="scroll">
					{roomState.messages.map(({ text, sender, type }, i) => <ListItem key={i + text + sender}>
						<HStack>
							<Text color="white">
								{`${sender} :`}
							</Text>
							<Text color={colorMap[type]}>{text}</Text>
						</HStack>
					</ListItem>)}
					<div ref={messagesEndRef} />
				</List>
			</AccordionPanel>
		</AccordionItem>
		<ChatSend />
	</Accordion>;
};

export default memo(Chat);
