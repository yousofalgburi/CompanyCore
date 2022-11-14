import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
	const state = useSelector((state) => state.user)
	const navigate = useNavigate()
	const userData = state?.userData

	useEffect(() => {
		if (userData && !userData?.team) {
			navigate('/team')
		}
	}, [userData, navigate])

	return <h1>inside home</h1>
}

export default Home
