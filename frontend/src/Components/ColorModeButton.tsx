import { Button, useColorMode } from '@chakra-ui/react'

const ColorModeButton = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<div className='color_mode_button'>
			<Button onClick={toggleColorMode}>
				Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
		</div>
	)
}

export default ColorModeButton
