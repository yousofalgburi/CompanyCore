import './App.css'

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
import theme from './theme'

// Components
import Navbar from './components/layout/Navbar'
import Homepage from './components/layout/Homepage'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

const App = () => {
	const user = JSON.parse(localStorage.getItem('profile'))

	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route
						path='/auth'
						exact
						element={!user ? <Navigate to='login' /> : <Navigate to='/' />}
					/>
					<Route path='/auth/login' exact element={<LoginPage />} />
					<Route path='/auth/register' exact element={<RegisterPage />} />
					<Route path='*' exact element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
