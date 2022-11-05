import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useDisclosure,
	useMergeRefs,
} from '@chakra-ui/react'
import { useField } from 'formik'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const PasswordField = React.forwardRef((props, ref) => {
	const [field, meta] = useField(props)
	const { isOpen, onToggle } = useDisclosure()
	const inputRef = React.useRef(null)
	const mergeRef = useMergeRefs(inputRef, ref)
	const onClickReveal = () => {
		onToggle()
		if (inputRef.current) {
			inputRef.current.focus({
				preventScroll: true,
			})
		}
	}
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
			<FormLabel htmlFor={props.name}>
				{props.name === 'password' ? 'Password' : 'Confirm Password'}
			</FormLabel>
			<InputGroup>
				<InputRightElement>
					<IconButton
						variant='link'
						aria-label={isOpen ? 'Mask password' : 'Reveal password'}
						icon={isOpen ? <HiEyeOff /> : <HiEye />}
						onClick={onClickReveal}
					/>
				</InputRightElement>
				<Input
					ref={mergeRef}
					type={isOpen ? 'text' : 'password'}
					{...field}
					{...props}
					{...props.formik.getFieldProps(props.name)}
				/>
			</InputGroup>
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	)
})

export default PasswordField
