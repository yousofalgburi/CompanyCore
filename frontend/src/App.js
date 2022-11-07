import './App.css'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
import theme from './theme'
import decode from 'jwt-decode'

// Components
import Navbar from './components/layout/Navbar'
import Homepage from './components/layout/Homepage'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import { useDispatch } from 'react-redux'
import { logout, setUser } from './features/user/userSlice'
import { useEffect } from 'react'
import Team from './components/pages/team/Team'
import ProtectedRoutes from './components/misc/ProtectedRoutes'

const App = () => {
	const dispatch = useDispatch()
	const user = JSON.parse(localStorage.getItem('userData'))

	useEffect(() => {
		if (user?.token) {
			const decodedToken = decode(user?.token)

			if (decodedToken.exp * 1000 < new Date().getTime()) {
				dispatch(logout())
			}
		}

		if (user) dispatch(setUser(user))
	}, [dispatch, user])

	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path='/'
						exact
						element={
							user?.userData && user?.userData?.team ? (
								<Homepage />
							) : (
								<Navigate to='/team' />
							)
						}
					/>
					<Route
						path='/auth/login'
						exact
						element={user?.userData ? <Navigate to='/' /> : <LoginPage />}
					/>
					<Route
						path='/auth/register'
						exact
						element={user?.userData ? <Navigate to='/' /> : <RegisterPage />}
					/>
					<Route
						path='/team'
						exact
						element={
							user?.userData && user?.userData?.team ? (
								<Navigate to='/' />
							) : (
								<ProtectedRoutes>
									<Team />
								</ProtectedRoutes>
							)
						}
					/>
					<Route path='*' exact element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
