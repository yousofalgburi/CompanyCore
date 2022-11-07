import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)

	useEffect(() => {
		if (!user.userData) navigate('/auth/login')
	}, [user, navigate])

	return <>{props.children}</>
}

export default ProtectedRoutes
