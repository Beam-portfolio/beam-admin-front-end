import axiosInstance, { fetcher } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IinitialState {
  mails: any[],
  mail: any,
  newMailReply: {
    message: string,
    subject: string,

  }
  error: any,
  loading: boolean
  loadingM: boolean
}

const initialState: IinitialState = {
  mails: [],
  mail: null,
  newMailReply: {
    message: '',
    subject: ''
  },
  loading: false,
  error: null,
  loadingM: false
}

export const fetchMails = createAsyncThunk('/mails/fetchMails', async (_, { rejectWithValue }) => {
  try {
    const response = await fetcher('/messages')
    return response.data || response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
  }
})


export const fetchMail = createAsyncThunk('/mail/fetchMail', async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetcher(`/messages/${id}`)
    return response.data || response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
  }
})

export const createReply = createAsyncThunk('mail/createReply', async ({ id, messageData }: { id: string, messageData: any }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post(`/messages/reply/${id}`, messageData)
    return data.data || data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
  }
})



const mailsSlice = createSlice({
  name: 'mailsSlice',
  initialState,
  reducers: {
    changeNewReply: (state, action) => {
      const {
        field,
        value,
      }: { field: keyof IinitialState['newMailReply']; value: string } =
        action.payload;
      state.newMailReply[field] = value
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMails.fulfilled, (state, action) => {
      state.mails = action.payload
      state.error = null
      state.loading = false
    })
      .addCase(fetchMails.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchMail.fulfilled, (state, action) => {
        state.mail = action.payload
        state.error = null
        state.loadingM = false
      })
      .addCase(fetchMail.pending, (state, action) => {
        state.loadingM = true
        state.error = null
      })
      .addCase(fetchMail.rejected, (state, action) => {
        state.loadingM = false
        state.error = action.payload as string
      })
  }
})

export const { changeNewReply } = mailsSlice.actions


export default mailsSlice.reducer