import axiosInstance, { fetcher } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface ServiceState {
  services: any[];
  newService: any;
  isLoading: boolean;
  ladingB: boolean;
  error: any;
  open: boolean;
  editMode: string | null;
}

const initialState: ServiceState = {
  services: [],
  newService: {},
  isLoading: false,
  error: null,  
  open: false,
  ladingB: false,
  editMode: null,
}

export const fetchServices = createAsyncThunk('/services/fetchServices', async (
  _,
  { rejectWithValue }
) => {
  try {
    const data = await fetcher('/services')
    return data.services
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch services')
  }
})

export const createService = createAsyncThunk('/services/createService', async (
  service: any,
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.post('/services', service)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create service')
  }
})

export const updateService = createAsyncThunk('/services/updateService', async (
  { id, service }: { id: number; service: any },
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.patch(`/services/${id}`, service)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update service')
  }
})

export const deleteService = createAsyncThunk('/services/deleteService', async (
  id: number,
  { rejectWithValue }
) => {
  try {
    const response = await axiosInstance.delete(`/services/${id}`)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete service')
  }
})

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = [...action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeNewService: (state, action) => {
      const {
        field,
        value,
      }: { field: keyof ServiceState['newService']; value: string | File | null } =
        action.payload;
      if (field === 'icon' && (value === null || value instanceof File)) {
        state.newService[field] = value;
      } else if (field === 'icon' && typeof value === 'string') {
        state.newService[field] = value;
      } else if (field !== 'icon') {
        state.newService[field] = value;
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
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchServices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(createService.fulfilled, (state, action) => {
      state.services = [...state.services, action.payload];
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(createService.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    builder.addCase(createService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.services = state.services.map((service) =>
        service.id === action.payload.id ? action.payload : service
      );
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(updateService.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    builder.addCase(updateService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload.id
      );
        state.isLoading = false;
      state.error = null;
    })
    builder.addCase(deleteService.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    builder.addCase(deleteService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

  }
})

export const { setServices, setError, setIsLoading, changeNewService, openCreateDialog, closeCreateDialog, setLadingB, setEditMode } = serviceSlice.actions
export default serviceSlice.reducer
