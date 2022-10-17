import ColorModeButton from '../ColorModeButton'
import Login from './Login'
import Register from './Register'

import { Navigate } from 'react-router-dom'

let isLoggedIn = true

const Authentication = () => {
	let user = true
	if (user) return <Navigate to='/' replace />

	return (
		<>
			<ColorModeButton />
			{isLoggedIn ? <Login /> : <Register />}
		</>
	)
}

export default Authentication
