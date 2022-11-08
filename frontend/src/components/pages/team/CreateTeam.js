import { Button, Center, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTeam } from '../../../features/team/teamActions'

const CreateTeam = ({ setJoinTeamPage, email }) => {
	const [teamName, setTeamName] = useState('')
	const dispatch = useDispatch()

	return (
		<Stack spacing='6'>
			<Heading>Choose a Team Name</Heading>
			<Input
				placeholder='team name'
				value={teamName}
				onChange={(e) => setTeamName(e.target.value)}
			/>
			<Button
				colorScheme='green'
				onClick={() => dispatch(createTeam({ teamName, email }))}
			>
				Create
			</Button>

			<Center>
				<Text>OR</Text>
			</Center>

			<Button colorScheme='blue' onClick={() => setJoinTeamPage(true)}>
				Join a Team Instead
			</Button>
		</Stack>
	)
}

export default CreateTeam
