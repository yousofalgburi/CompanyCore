import {
	Button,
	Center,
	Container,
	Divider,
	Heading,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react'

const Team = () => {
	return (
		<Container
			maxW='lg'
			py={{
				base: '12',
				md: '24',
			}}
			px={{
				base: '0',
				sm: '8',
			}}
		>
			<Stack spacing='6'>
				<Heading>Join a Team</Heading>
				<Input placeholder='team code' />
				<Button>Join</Button>
			</Stack>

			<Divider />

			<Center>
				<Text>Or</Text>
			</Center>

			<Divider />

			<Stack spacing='8'>
				<Button>Create New Team</Button>
			</Stack>
		</Container>
	)
}

export default Team
