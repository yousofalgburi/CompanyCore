import { Box, Container, Text } from '@chakra-ui/react'
import './ActionContainer.module.css'

const ActionFeedContainer = () => {
	let listOfItems = [
		{
			title: 'this is a test message 1',
		},
		{
			title: 'this is a test message 2',
		},
		{
			title: 'this is a test message 3',
		},
		{
			title: 'this is a test message 4',
		},
		{
			title: 'this is a test message 5',
		},
	]

	return listOfItems.map((item) => {
		return (
			<Box p={5} bg='cyan.600' className='action-container-item'>
				<Text fontSize='xl'>{item.title}</Text>
			</Box>
		)
	})
}

export default ActionFeedContainer
