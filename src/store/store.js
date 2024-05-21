import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../components/usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});

export default store;
