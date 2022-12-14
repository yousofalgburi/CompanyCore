import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Homepage = () => {
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

	return <h1>Homepage</h1>
}

export default Homepage
