import {
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertTitle,
} from '@chakra-ui/react'
import PasswordField from './PasswordField'
import { Link as ReachLink, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import InputField from './InputField'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../../../features/user/userAction'
import { resetAuthState } from '../../../features/user/userSlice'
import { useEffect } from 'react'

const LoginPage = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.userData) navigate('/team')
	}, [user, navigate])

	const state = useSelector((state) => state.user)
	const { error, success } = state.authState

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
			<Stack spacing='8'>
				<Stack spacing='6'>
					<Stack
						spacing={{
							base: '2',
							md: '3',
						}}
						textAlign='center'
					>
						{error && (
							<Alert status='error'>
								<AlertIcon />
								<AlertTitle>{error}</AlertTitle>
							</Alert>
						)}
						<Heading
							size={useBreakpointValue({
								base: 'xs',
								md: 'sm',
							})}
						>
							Sign in to your account
						</Heading>
						<HStack spacing='1' justify='center'>
							<Text color='muted'>Need to create an account?</Text>
							<Button
								variant='link'
								as={ReachLink}
								to='/auth/register'
								colorScheme='blue'
								onClick={dispatch(resetAuthState)}
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
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={(values, actions) => {
							actions.setSubmitting(true)
							dispatch(signinUser(values))
						}}
					>
						{(formik) => (
							<Stack spacing='4' as={Form} onSubmit={formik.handleSubmit}>
								<InputField
									label='Email'
									name='email'
									placeholder='email'
									type='email'
								/>
								<PasswordField
									formik={formik}
									name='password'
									placeholder='password'
								/>
								<Button
									mt={4}
									isLoading={formik.isSubmitting && !error && !success}
									colorScheme='blue'
									type='submit'
								>
									Sign in
								</Button>
							</Stack>
						)}
					</Formik>
				</Box>
			</Stack>
		</Container>
	)
}

export default LoginPage
