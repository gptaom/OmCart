import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const AdminUserList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = React.useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get('/api/users', config);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    }
  }, [userInfo.token]);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('User deleted');
        fetchUsers();
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  useEffect(() => {
    if (userInfo?.isAdmin) fetchUsers();
  }, [userInfo, fetchUsers]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Role</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border-b">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">{u.isAdmin ? 'Admin' : 'User'}</td>
                <td className="p-2 border-b">
                  <button onClick={() => deleteUser(u._id)}>
                    <Trash2 className="text-red-600" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserList;
