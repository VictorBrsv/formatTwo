import { Button } from '@mui/material';
import UserList from './components/UserList';
import { fetchData } from './mockData';
import { setUsers, setLoading } from './components/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  const getUsersHandler = () => {
    dispatch(setLoading(true));
    const getUsers = async () => {
      try {
        const data = await fetchData();
        const users = Object.values(data);
        dispatch(setUsers(users));
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUsers();
  };

  return (
    <div className='app'>
      <Button onClick={getUsersHandler} variant='contained' color='primary'>
        Загрузить список
      </Button>
      {loading ? <CircularProgress /> : <UserList />}
    </div>
  );
};

export default App;
