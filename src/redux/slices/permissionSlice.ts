import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { IPermission } from 'src/types/permission';

interface PermissionState {
  permissions: IPermission[];
  currentPermission: IPermission | null;
  loading: boolean;
  error: string | null;
}

const initialState: PermissionState = {
  permissions: [],
  currentPermission: null,
  loading: false,
  error: null,
};

export const fetchPermissions = createAsyncThunk(
  'permission/fetchPermissions',
  async (params: { resource?: string; action?: string } | undefined, { rejectWithValue }) => {
    try {
      const ms = new URLms();
      if (params?.resource) ms.append('resource', params.resource);
      if (params?.action) ms.append('action', params.action);

      const response = await axios.get(`/permissions?${ms.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch permissions');
    }
  }
);

export const createPermission = createAsyncThunk(
  'permission/createPermission',
  async (data: Partial<IPermission>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/permissions', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create permission');
    }
  }
);

export const updatePermission = createAsyncThunk(
  'permission/updatePermission',
  async ({ id, data }: { id: number; data: Partial<IPermission> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/permissions/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update permission');
    }
  }
);

export const deletePermission = createAsyncThunk(
  'permission/deletePermission',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/permissions/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete permission');
    }
  }
);

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create permission
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })
      // Update permission
      .addCase(updatePermission.fulfilled, (state, action) => {
        const index = state.permissions.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.permissions[index] = action.payload;
        }
      })
      // Delete permission
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter((p) => p.id !== action.payload);
      });
  },
});

export default permissionSlice.reducer;
