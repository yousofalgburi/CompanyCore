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
import { Link as ReachLink, Navigate, useNavigate } from 'react-router-dom'
import NotificationsBell from '../misc/NotificationsBell'
import { logout } from '../../feature/user/userSlice'
import { useDispatch } from 'react-redux'

const Navbar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	let name

	const user = JSON.parse(localStorage.getItem('user'))

	if (user) {
		name = user.name
	}

	const handleLogout = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('userToken')
		dispatch(logout())
		return <Navigate to='/' />
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
								<Text>Welcome, {name}</Text>
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
