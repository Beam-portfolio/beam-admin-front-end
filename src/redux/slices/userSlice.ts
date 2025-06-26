import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { IUser } from 'src/types/user';

interface UserState {
  users: IUser[];
  currentUser: IUser | null;
  loading: boolean;
  error: string | null;
  userSettings: any;
  customers: IUser[];
}

const initialState: UserState = {
  users: [],
  customers: [],
  userSettings: {},
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/users');
    return response.data.data.users;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

export const fetchCustomers = createAsyncThunk(
  'user/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users/customers');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: Partial<IUser>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users', userData);
      return response.data.user; // Make sure we return the created user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUserStore = createAsyncThunk(
  'user/updateUserStore',
  async (storeData: Partial<IUser>, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/v1/stores/${storeData.id}`, storeData);
      return response.data.user; // Make sure we return the created user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/users/${id}`, data);

      return response.data.data.user; // Make sure we return the updated user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/users/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error?.message || 'Failed to delete user'
      );
    }
  }
);

export const fetchUserSettings = createAsyncThunk(
  'user/fetchUserSettings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user settings');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user?.id === action?.payload?.id);
        if (index !== -1) {
          // Replace the entire user object with the updated data
          state.users[index] = action.payload;
        }
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user settings
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.userSettings = action.payload;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
