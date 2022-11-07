import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createTeam = createAsyncThunk(
	'team/createTeam',
	async ({ teamName }, { rejectWithValue }) => {
		try {
			await axios.post(
				'http://localhost:8080/team/createTeam',
				{
					teamName,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
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
	async ({ teamCode }, { rejectWithValue }) => {
		try {
			await axios.post(
				'http://localhost:8080/team/joinTeam',
				{
					teamCode,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message)
			} else {
				return rejectWithValue(error.message)
			}
		}
	}
)
