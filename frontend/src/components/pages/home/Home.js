import { Container, Heading, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ActionFeedContainer from './ActionFeedContainer'

const Home = () => {
	const state = useSelector((state) => state.user)
	const navigate = useNavigate()
	const userData = state?.userData

	useEffect(() => {
		if (userData && !userData?.team) {
			navigate('/team')
		} else if (userData && userData?.team) {
			navigate('/home')
		}
	}, [userData, navigate])

	return (
		<Container maxW={1000}>
			<VStack mt={10} align='left'>
				<Heading>Action Feed</Heading>

				<ActionFeedContainer />
			</VStack>
		</Container>
	)
}

export default Home
