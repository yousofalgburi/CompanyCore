import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import PasswordField from './PasswordField'
import { Link as ReachLink } from 'react-router-dom'

const LoginPage = () => (
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
		<Stack spacing='8'>
			<Stack spacing='6'>
				<Stack
					spacing={{
						base: '2',
						md: '3',
					}}
					textAlign='center'
				>
					<Heading
						size={useBreakpointValue({
							base: 'xs',
							md: 'sm',
						})}
					>
						Log in to your account
					</Heading>
					<HStack spacing='1' justify='center'>
						<Text color='muted'>Don't have an account?</Text>
						<Button
							variant='link'
							as={ReachLink}
							to='/auth/register'
							colorScheme='blue'
						>
							Register
						</Button>
					</HStack>
				</Stack>
			</Stack>
			<Box
				py={{
					base: '0',
					sm: '8',
				}}
				px={{
					base: '4',
					sm: '10',
				}}
				bg={useBreakpointValue({
					base: 'transparent',
					sm: 'bg-surface',
				})}
				boxShadow={{
					base: 'none',
					sm: useColorModeValue('md', 'md-dark'),
				}}
				borderRadius={{
					base: 'none',
					sm: 'xl',
				}}
			>
				<Stack spacing='6'>
					<Stack spacing='5'>
						<FormControl>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<Input id='email' type='email' />
						</FormControl>
						<PasswordField name='password' />
					</Stack>
					<HStack justify='space-between'>
						<Checkbox defaultChecked>Remember me</Checkbox>
						<Button variant='link' colorScheme='blue' size='sm'>
							Forgot password?
						</Button>
					</HStack>
					<Stack spacing='6'>
						<Button colorScheme='blue'>Sign in</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	</Container>
)

export default LoginPage
