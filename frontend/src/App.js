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
	const user = JSON.parse(localStorage.getItem('user'))

	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Homepage />} exact />
					<Route path='/auth/login' element={<LoginPage />} exact />
					<Route path='/auth/register' element={<RegisterPage />} exact />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
