import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';
import userReducer from './slices/userSlice';
import projectsReduser from './slices/projectsSlice'
import serviceReducer from './slices/serviceSlice'
import customerWordReducer from './slices/customerWordSlice'
import mailsReduser from './slices/mailsSlice'
import SettingsReducer from './slices/settings';
// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    role: roleReducer,
    permission: permissionReducer,
    user: userReducer,
    projects: projectsReduser,
    service: serviceReducer,
    customerWord: customerWordReducer,
    mails: mailsReduser,
    settings: SettingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export { store };
