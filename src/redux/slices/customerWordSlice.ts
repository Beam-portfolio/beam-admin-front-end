import axiosInstance, { fetcher } from '@/utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CustomerWordState {
  customerWords: any[];
  newCustomerWord: any;
  isLoading: boolean;
  error: any;
  open: boolean;
  ladingB: boolean;
  editMode: string | null;
}

const initialState: CustomerWordState = {
  customerWords: [],
  newCustomerWord: {},
  isLoading: false,
  error: null,
  open: false,
  ladingB: false,
  editMode: null,
};

export const fetchCustomerWords = createAsyncThunk('/customer-word/fetchCustomerWords', async (
  _,
  { rejectWithValue }
) => {
  try {
    const data = await fetcher('/customer-word');
    console.log(data);

    return data.customerWords || data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
  }
});

export const createCustomerWord = createAsyncThunk('/customer-word/createCustomerWord', async (
  customerWord: any,
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.post('/customer-word', customerWord);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create testimonial');
  }
});

export const updateCustomerWord = createAsyncThunk('/customer-word/updateCustomerWord', async (
  { id, customerWord }: { id: number; customerWord: any },
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.patch(`/customer-word/${id}`, customerWord);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
  }
});

export const deleteCustomerWord = createAsyncThunk('/customer-word/deleteCustomerWord', async (
  id: number,
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.delete(`/customer-word/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
  }
});

export const customerWordSlice = createSlice({
  name: 'customerWord',
  initialState,
  reducers: {
    setCustomerWords: (state, action) => {
      state.customerWords = [...action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeNewCustomerWord: (state, action) => {
      const { field, value }: { field: keyof CustomerWordState['newCustomerWord']; value: string | File | null } = action.payload;
      if (field === 'avatar' && (value === null || value instanceof File)) {
        state.newCustomerWord[field] = value;
      } else if (field === 'avatar' && typeof value === 'string') {
        state.newCustomerWord[field] = value;
      } else if (field !== 'avatar') {
        state.newCustomerWord[field] = value;
      }
    },
    openCreateDialog: (state) => {
      state.open = true;
    },
    closeCreateDialog: (state) => {
      state.open = false;
    },
    setLadingB: (state, action) => {
      state.ladingB = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerWords.fulfilled, (state, action) => {
      state.customerWords = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCustomerWords.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCustomerWords.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCustomerWord.fulfilled, (state, action) => {
      state.customerWords = [...state.customerWords, action.payload];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createCustomerWord.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createCustomerWord.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCustomerWord.fulfilled, (state, action) => {
      state.customerWords = state.customerWords.map((item) =>
        item.id === action?.payload?.id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateCustomerWord.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateCustomerWord.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCustomerWord.fulfilled, (state, action) => {
      state.customerWords = state.customerWords.filter(
        (item) => item.id !== action.payload.id
      );
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteCustomerWord.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteCustomerWord.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

export const {
  setCustomerWords,
  setError,
  setIsLoading,
  changeNewCustomerWord,
  openCreateDialog,
  closeCreateDialog,
  setLadingB,
  setEditMode,
} = customerWordSlice.actions;
export default customerWordSlice.reducer;
