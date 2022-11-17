import { Button, Center, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { joinTeam } from '../../../features/team/teamActions'
import { resetTeamState } from '../../../features/user/userSlice'

const JoinTeam = ({ setJoinTeamPage, email }) => {
	const dispatch = useDispatch()
	const [teamCode, setTeamCode] = useState('')

	const handlePageSwitch = () => {
		setJoinTeamPage(false)
		dispatch(resetTeamState())
	}

	return (
		<Stack spacing='6'>
			<Heading>Join a Team</Heading>
			<Input
				placeholder='team code'
				value={teamCode}
				onChange={(e) => setTeamCode(e.target.value)}
			/>
			<Button
				colorScheme='blue'
				onClick={() => dispatch(joinTeam({ teamCode, email }))}
			>
				Join
			</Button>

			<Center>
				<Text>OR</Text>
			</Center>

			<Button colorScheme='green' onClick={handlePageSwitch}>
				Create New Team
			</Button>
		</Stack>
	)
}

export default JoinTeam
