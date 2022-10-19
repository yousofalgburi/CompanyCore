import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
	'user/register',
	async ({ firstName, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			await axios.post(
				'http://localhost:8080/register',
				{ firstName, email, password },
				config
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
