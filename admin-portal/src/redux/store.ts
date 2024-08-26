import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
      users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// Export a custom `useAppDispatch` hook that uses the `AppDispatch` type
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
