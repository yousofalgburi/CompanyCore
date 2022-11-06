import { createSlice } from '@reduxjs/toolkit'
import { registerUser, signinUser } from './userAction'

const initialState = {
	userData: null,
	userToken: null,
	authState: {
		error: null,
		success: false,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetAuthState: (state) => {
			state.authState = initialState.authState
		},
		logout: (state) => {
			state.userInfo = null
			state.userToken = null
			state.authState = initialState.authState
		},
		setUser: (state, { payload }) => {
			console.log(payload)
			state.userData = JSON.parse(localStorage.getItem('user'))
			state.userToken = JSON.parse(localStorage.getItem('userToken'))
		},
	},
	extraReducers: {
		[registerUser.fulfilled]: (state) => {
			state.authState.loading = false
			state.authState.success = true
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
		[signinUser.fulfilled]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.success = true

			localStorage.setItem('user', JSON.stringify(payload.result))
			localStorage.setItem('userToken', JSON.stringify(payload.token))
			state.userData = JSON.parse(localStorage.getItem('user'))
			state.userToken = JSON.parse(localStorage.getItem('userToken'))
		},
		[signinUser.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
	},
})

export const { resetAuthState, logout, setUser } = userSlice.actions
export default userSlice.reducer
