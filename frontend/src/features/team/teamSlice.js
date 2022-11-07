import { createSlice } from '@reduxjs/toolkit'
import { createTeam, joinTeam } from './teamActions'

const initialState = {
	teamData: null,
	teamState: {
		error: null,
		success: false,
	},
}

const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {},
	extraReducers: {
		[createTeam.fulfilled]: (state) => {
			state.authState.loading = false
			state.authState.success = true
		},
		[createTeam.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
		[joinTeam.fulfilled]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.success = true
		},
		[joinTeam.rejected]: (state, { payload }) => {
			state.authState.loading = false
			state.authState.error = payload
		},
	},
})

export default teamSlice.reducer
