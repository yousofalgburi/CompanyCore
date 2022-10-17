import './Components/CSS/App.css'
import Authentication from './Components/Auth/Authentication'
import Container from './Components/Layout/Container'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Components/Home/Homepage'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/login' element={<Authentication />} />
		</Routes>
	)
}

export default App
