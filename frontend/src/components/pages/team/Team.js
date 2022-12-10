import {
	Alert,
	AlertIcon,
	AlertTitle,
	Container,
	Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'

const Team = () => {
	const state = useSelector((state) => state.user)
	const [joinTeamPage, setJoinTeamPage] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		if (state?.userData?.team) navigate('/home')
	}, [state, navigate])

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
				{state?.teamState?.error && (
					<Alert status='error'>
						<AlertIcon />
						<AlertTitle>{state?.teamState?.error}</AlertTitle>
					</Alert>
				)}

				{joinTeamPage ? (
					<JoinTeam
						email={state?.userData?.email}
						setJoinTeamPage={setJoinTeamPage}
					/>
				) : (
					<CreateTeam
						email={state?.userData?.email}
						setJoinTeamPage={setJoinTeamPage}
					/>
				)}
			</Stack>
		</Container>
	)
}

export default Team
