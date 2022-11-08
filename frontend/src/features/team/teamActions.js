import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createTeam = createAsyncThunk(
	'team/createTeam',
	async ({ teamName, email }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				'http://localhost:8080/team/createTeam',
				{
					teamName,
					email,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			return data
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message)
			} else {
				return rejectWithValue(error.message)
			}
		}
	}
)

export const joinTeam = createAsyncThunk(
	'team/joinTeam',
	async ({ teamCode, email }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				'http://localhost:8080/team/joinTeam',
				{
					teamCode,
					email,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			return data
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message)
			} else {
				return rejectWithValue(error.message)
			}
		}
	}
)
