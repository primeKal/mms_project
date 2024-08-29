import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice';
import { RootState, useAppDispatch } from '../../redux/store';


const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
