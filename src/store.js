import { configureStore } from '@reduxjs/toolkit'
import userSlice, {fetchUsers} from './slices/user-slice';

const store = configureStore({
  reducer: {
    users: userSlice
  },
})

store.dispatch(fetchUsers());

export default store;