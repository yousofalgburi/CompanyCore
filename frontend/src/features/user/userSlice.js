import { createSlice } from '@reduxjs/toolkit'
import { registerUser, signinUser } from './userAction'

const initialState = {
	userData: null,
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
			localStorage.removeItem('userData')
			state.userData = null
			state.authState = initialState.authState
		},
		setUser: (state, { payload }) => {
			state.userData = { ...payload }
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
			localStorage.setItem(
				'userData',
				JSON.stringify({ ...payload.result, token: payload.token })
			)
			state.userData = { ...payload.result, token: payload.token }

			state.authState.loading = false
			state.authState.success = true
		},
		[signinUser.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
	},
})

export const { resetAuthState, logout, setUser } = userSlice.actions
export default userSlice.reducer
