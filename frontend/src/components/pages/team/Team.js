import { Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'

const Team = () => {
	const state = useSelector((state) => state.user)
	const navigate = useNavigate()
	const [joinTeamPage, setJoinTeamPage] = useState(true)
	const team = state.userData?.team

	useEffect(() => {
		if (team) navigate('/')
	}, [team, navigate])

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
			{joinTeamPage ? (
				<JoinTeam setJoinTeamPage={setJoinTeamPage} />
			) : (
				<CreateTeam
					email={state.userData.email}
					setJoinTeamPage={setJoinTeamPage}
				/>
			)}
		</Container>
	)
}

export default Team
