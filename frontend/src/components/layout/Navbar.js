import {
	Box,
	Flex,
	Heading,
	HStack,
	Spacer,
	Text,
	Link,
} from '@chakra-ui/react'
import ColorModeSwitcher from '../misc/ColorModeSwitcher'
import { Link as ReachLink } from 'react-router-dom'
import NotificationsBell from '../misc/NotificationsBell'

const Navbar = () => {
	const user = JSON.parse(localStorage.getItem('profile'))

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
						{user ? (
							<>
								<Text>Welcome, Name</Text>
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
