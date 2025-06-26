import axiosInstance, { fetcher } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialStateI {
  settings: {
    email: string,
    address: string,
    mapAddress: string,
    phone: string,
    whatsapp: string,
    linkedin: string,
    github: string,
    about: string
  },
  loading: boolean,
  error: any
}

const initialState: InitialStateI = {
  settings: {
    email: '',
    address: '',
    mapAddress: '',
    phone: '',
    whatsapp: '',
    linkedin: '',
    github: '',
    about: ''
  },
  loading: false,
  error: null
}

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, { rejectWithValue }) => {
  try {
    const response = await fetcher('/settings')
    return response.data || response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const UpdateSettings = createAsyncThunk('settings/updateSettings', async (settings, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch('/settings', settings)
    return response.data || response
  } catch (error) {
    return rejectWithValue(error)
  }
})

const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeFields: (state, action) => {
      state.settings = {
        ...state.settings,
        [action.payload.name]: action.payload.value
      } 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.settings = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchSettings.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(UpdateSettings.fulfilled, (state, action) => {
      state.settings = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(UpdateSettings.pending, (state) => {
      state.loading = true
    })
    builder.addCase(UpdateSettings.rejected, (state, action) => {
      state.error = action.payload
    })
  }
})

export const { changeFields } = SettingsSlice.actions
export default SettingsSlice.reducer