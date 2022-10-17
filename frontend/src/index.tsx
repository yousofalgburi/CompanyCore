import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import './Components/CSS/index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</ChakraProvider>
		</Provider>
	</BrowserRouter>
)
