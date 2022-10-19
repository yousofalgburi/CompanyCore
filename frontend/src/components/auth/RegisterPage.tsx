import {
	Box,
	Button,
	Checkbox,
	Container,
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
import { PasswordField } from './PasswordField'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/user/userAction'
import type {} from 'redux-thunk/extend-redux'

const RegisterPage = () => {
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()

	type MyFormTypes = {
		name: string
		email: string
		password: string
		confirmPassword: string
	}

	const myForm = useForm<MyFormTypes>()

	const formSubmit = (data: MyFormTypes) => {
		if (data.password != data.confirmPassword) {
			return alert('password mismatch')
		}

		data.email = data.email.toLowerCase()
		dispatch(registerUser(data, {}))
	}

	return (
		<Container
			maxW='lg'
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Stack spacing='8'>
				<Stack spacing='6'>
					<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
						<Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
							Register a new account
						</Heading>
						<HStack spacing='1' justify='center'>
							<Text color='muted'>Already have an account?</Text>
							<Button variant='link' colorScheme='blue'>
								Sign in
							</Button>
						</HStack>
					</Stack>
				</Stack>
				<Box
					py={{ base: '0', sm: '8' }}
					px={{ base: '4', sm: '10' }}
					bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
					boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
					borderRadius={{ base: 'none', sm: 'xl' }}
				>
					<form
						onSubmit={handleSubmit((formData) =>
							formSubmit(formData as MyFormTypes)
						)}
					>
						<Stack spacing='6'>
							<Stack spacing='5'>
								<FormControl>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<Input id='name' type='text' {...register('name')} required />
								</FormControl>
								<FormControl>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<Input
										id='email'
										type='email'
										{...register('email')}
										required
									/>
								</FormControl>
								<FormControl>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<PasswordField id='password' {...register('password')} />
								</FormControl>
								<FormControl>
									<FormLabel htmlFor='password'>Confirm Password</FormLabel>
									<PasswordField
										id='confirmPassword'
										{...register('confirmPassword')}
									/>
								</FormControl>
							</Stack>
							<Stack spacing='6'>
								<Button type='submit' colorScheme='blue'>
									Register
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Container>
	)
}

export default RegisterPage
