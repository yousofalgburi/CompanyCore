import {
	Box,
	Flex,
	Heading,
	HStack,
	Spacer,
	Text,
	Link,
	Button,
} from '@chakra-ui/react'
import ColorModeSwitcher from '../misc/ColorModeSwitcher'
import { Link as ReachLink, useNavigate } from 'react-router-dom'
import NotificationsBell from '../misc/NotificationsBell'
import { logout, resetTeamState } from '../../features/user/userSlice'
import { leaveTeam } from '../../features/team/teamActions'
import { useDispatch, useSelector } from 'react-redux'
import AlertDialogButton from '../misc/AlertDialogButton'

const Navbar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	let name,
		teamName = 'No Team'

	const { userData } = useSelector((state) => state.user)

	if (userData) {
		name = userData.name

		if (userData?.team) teamName = userData.team.teamName
	}

	const handleLogout = async () => {
		await dispatch(logout())
		navigate('/auth/login')
	}

	const handleLeaveTeam = async () => {
		dispatch(leaveTeam({ email: userData.email }))
		dispatch(resetTeamState())
	}

	return (
		<Box bg='blue.500' w='100%' p={4} color='white'>
			<Flex>
				<Box>
					<Heading>
						<ReachLink to='/'>CompanyCore</ReachLink>
					</Heading>
				</Box>

				<Spacer />

				<Box>
					<HStack>
						{name ? (
							<>
								<Text>Welcome, {name} | </Text>
								<Text>
									Team Name: {teamName}{' '}
									{userData.team && ' / Team Code: ' + userData.team.teamCode}{' '}
								</Text>

								{userData.team && (
									<>
										<AlertDialogButton
											buttonMessage='Leave Team'
											confirmEvent={handleLeaveTeam}
										/>
									</>
								)}
								<Button colorScheme='blue' onClick={handleLogout} size='md'>
									Logout
								</Button>
								<NotificationsBell />
							</>
						) : (
							<Link as={ReachLink} to='/auth/login'>
								Login
							</Link>
						)}
						<ColorModeSwitcher />
					</HStack>
				</Box>
			</Flex>
		</Box>
	)
}

export default Navbar
