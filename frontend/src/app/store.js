import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import teamReducer from '../features/team/teamSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		team: teamReducer,
	},
})
