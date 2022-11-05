import { createSlice } from '@reduxjs/toolkit'
import { registerUser, signinUser } from './userAction'

const initialState = {
	userInfo: null,
	userToken: null,
	authState: {
		error: null,
		success: false,
		loading: false,
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
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.authState.loading = true
			state.authState.error = null
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.success = true
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
		[signinUser.pending]: (state) => {
			state.authState.loading = true
			state.authState.error = null
		},
		[signinUser.fulfilled]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.success = true

			state.userInfo = JSON.parse(localStorage.getItem('user'))
			state.userToken = JSON.parse(localStorage.getItem('userToken'))
		},
		[signinUser.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
	},
})

export const { resetAuthState, logout } = userSlice.actions
export default userSlice.reducer
