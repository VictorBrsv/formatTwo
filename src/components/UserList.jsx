import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const UserList = () => {
  const { users } = useSelector((state) => state.users);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [showActive, setShowActive] = useState(false);

  const filteredUsers = users
    .filter((user) =>
      `${user.last_name} ${user.first_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((user) => (showActive ? user.is_active : true))
    .sort((a, b) => {
      if (sort === 'asc') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sort === 'desc') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

  const handleReset = () => {
    setSearch('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSearch('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      {users.length > 0 && (
        <>
          <div>
            <input
              type='text'
              placeholder='Поиск...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button onClick={handleReset}>Сбросить</button>}
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                checked={showActive}
                onChange={(e) => setShowActive(e.target.checked)}
              />
              Показать только активных пользователей
            </label>
          </div>
          <div>
            <label>
              Сортировать по дате создания:
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value=''>Без сортировки</option>
                <option value='asc'>По возрастанию</option>
                <option value='desc'>По убыванию</option>
              </select>
            </label>
          </div>
        </>
      )}
      {users.length > 0 && filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{ color: user.is_active ? 'green' : 'black' }}
            >
              {user.last_name} {user.first_name},{' '}
              {new Date(user.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : users.length > 0 ? (
        <div>Не найдено совпадений</div>
      ) : (
        <div>Загрузите список пользователей...</div>
      )}
    </div>
  );
};

export default UserList;
