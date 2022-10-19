import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Header = () => {
	return (
		<Box bg='blue.600' w='100%' p={4} color='white'>
			<Flex>
				<Box>
					<Heading>CompanyCore</Heading>
				</Box>
				<Spacer />
				<Box>
					<ColorModeSwitcher />
				</Box>
			</Flex>
		</Box>
	)
}

export default Header
