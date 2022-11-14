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
import Home from './components/pages/home/Home'

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
					<Route path='/' exact element={<Homepage />} />
					<Route path='/home' exact element={<Home />} />
					<Route path='/auth/login' exact element={<LoginPage />} />
					<Route path='/auth/register' exact element={<RegisterPage />} />
					<Route path='/team' exact element={<Team />} />
					<Route path='*' exact element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
