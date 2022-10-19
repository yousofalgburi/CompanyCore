import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import Homepage from './components/home/Homepage'
import Header from './components/layout/Header'
import { Provider } from 'react-redux'
import store from './app/store'

export const App = () => (
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</Provider>
)
