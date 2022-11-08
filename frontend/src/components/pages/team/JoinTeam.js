import { Button, Center, Heading, Input, Stack, Text } from '@chakra-ui/react'

const JoinTeam = ({ setJoinTeamPage }) => {
	return (
		<Stack spacing='6'>
			<Heading>Join a Team</Heading>
			<Input placeholder='team code' />
			<Button colorScheme='blue'>Join</Button>

			<Center>
				<Text>OR</Text>
			</Center>

			<Button colorScheme='green' onClick={() => setJoinTeamPage(false)}>
				Create New Team
			</Button>
		</Stack>
	)
}

export default JoinTeam
