import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { IRole } from 'src/types/role';

interface RoleState {
  roles: IRole[];
  currentRole: IRole | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  currentRole: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchRoles = createAsyncThunk('role/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/users/roles');
    // Remove the string transformation since we're getting full permission objects
    return response.data.data.roles;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch roles');
  }
});

export const createRole = createAsyncThunk(
  'role/createRole',
  async (roleData: Partial<IRole>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/roles', roleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create role');
    }
  }
);

export const updateRole = createAsyncThunk(
  'role/updateRole',
  async ({ id, data }: { id: number; data: Partial<IRole> }, { rejectWithValue }) => {
    try {
      // Transform permission IDs back to numbers if needed
      const formattedData = {
        ...data,
        permissions: data.permissions?.map(Number),
      };
      const response = await axios.put(`/roles/${id}`, formattedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update role');
    }
  }
);

export const deleteRole = createAsyncThunk(
  'role/deleteRole',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/roles/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete role');
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    clearCurrentRole: (state) => {
      state.currentRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create role
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      // Update role
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      // Delete role
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      });
  },
});

export const { setCurrentRole, clearCurrentRole } = roleSlice.actions;
export default roleSlice.reducer;
