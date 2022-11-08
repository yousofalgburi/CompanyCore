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
import { logout } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	let name, teamName

	const { userData } = useSelector((state) => state.user)

	if (userData) {
		name = userData.name
		teamName = userData?.team?.teamName
	}

	const handleLogout = async () => {
		await dispatch(logout())
		navigate('/auth/login')
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
								<Text>Team: {teamName}</Text>
								<Button colorScheme='blue' onClick={handleLogout}>
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
