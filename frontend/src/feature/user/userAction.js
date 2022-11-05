import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			await axios.post(
				'http://localhost:8080/auth/register',
				{
					name,
					email,
					password,
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
