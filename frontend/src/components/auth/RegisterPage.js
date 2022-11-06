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
import * as Yup from 'yup'
import InputField from './InputField'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../feature/user/userAction'
import { resetAuthState } from '../../feature/user/userSlice'
import { useEffect } from 'react'

const RegisterPage = () => {
	const dispatch = useDispatch()
	const { error, success } = useSelector((state) => state.user.authState)

	const user = localStorage.getItem('user')
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate('/')
	}, [user, navigate])

	const ValidationSchema = {
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('name required'),
		email: Yup.string().email('Invalid email').required('email required'),
		password: Yup.string().min(8, 'too short!').required('password required'),
		confirmPassword: Yup.string()
			.required('confirm password required')
			.oneOf([Yup.ref('password'), null], 'passwords must match'),
	}

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
						{success && !error && (
							<Alert status='success'>
								<AlertIcon />
								<AlertTitle>
									Success! Please check your email to verify your account and
									complete registration.
								</AlertTitle>
							</Alert>
						)}
						<Heading
							size={useBreakpointValue({
								base: 'xs',
								md: 'sm',
							})}
						>
							Register a new account
						</Heading>
						<HStack spacing='1' justify='center'>
							<Text color='muted'>Already have an account?</Text>
							<Button
								variant='link'
								as={ReachLink}
								to='/auth/login'
								colorScheme='blue'
								onClick={dispatch(resetAuthState)}
							>
								Login
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
							name: '',
							email: '',
							password: '',
							confirmPassword: '',
						}}
						validationSchema={Yup.object(ValidationSchema)}
						onSubmit={(values, actions) => {
							actions.setSubmitting(true)
							dispatch(registerUser(values))
						}}
					>
						{(formik) => (
							<Stack spacing='4' as={Form} onSubmit={formik.handleSubmit}>
								<InputField
									label='Name'
									name='name'
									placeholder='name'
									type='text'
								/>
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
								<PasswordField
									formik={formik}
									name='confirmPassword'
									placeholder='confirm password'
								/>
								<Button
									mt={4}
									isLoading={formik.isSubmitting && !error && !success}
									colorScheme='blue'
									type='submit'
								>
									Create Account
								</Button>
							</Stack>
						)}
					</Formik>
				</Box>
			</Stack>
		</Container>
	)
}

export default RegisterPage
