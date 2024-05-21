import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
