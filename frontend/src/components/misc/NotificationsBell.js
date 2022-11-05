import { IconButton } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'

const NotificationsBell = (props) => {
	const handleBellClick = () => {
		console.log('bell clicked')
	}

	return (
		<IconButton
			size='md'
			fontSize='lg'
			aria-label={`Notification Bell`}
			variant='ghost'
			onClick={handleBellClick}
			icon={<BellIcon />}
			{...props}
		/>
	)
}

export default NotificationsBell
