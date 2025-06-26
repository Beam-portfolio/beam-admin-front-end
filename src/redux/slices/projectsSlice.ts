import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { fetcher } from 'src/utils/axios';

interface initialStateI {
  projects: any[],
  lastProjects: any[]
  types: any[],
  loading: boolean
  error: any,
  currentProject: any
}

const initialState: initialStateI = {
  projects: [],
  lastProjects: [],
  types: [],
  loading: false,
  error: null,
  currentProject: null
}

export const fetchProjects = createAsyncThunk('/projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetcher('/projects')
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects')
    }
  }
)

export const fetchTypes = createAsyncThunk('/types/fetchTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetcher('/types')
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch types')
    }
  }
)

export const fetchProjectById = createAsyncThunk('/projects/fetchProjectById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetcher(`/projects/${id}`)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project')
    }
  }
)

export const fetchLastProjects = createAsyncThunk('/projects/fetchLastProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetcher('/projects/latest')
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects')
    }
  }
)

const projectsSlice = createSlice({
  initialState,
  name: 'projects',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = [...action.payload].sort(
        (a: any, b: any) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime()
      ); state.loading = false
      state.error = false
    })
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.types = action.payload
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchTypes.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.currentProject = action.payload
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(fetchLastProjects.fulfilled, (state, action) => {
      state.lastProjects = action.payload
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchLastProjects.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchLastProjects.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default projectsSlice.reducer