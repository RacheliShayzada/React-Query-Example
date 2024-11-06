
import http from './http';

export const fetchUsers = async () => {
  try {
    const response = await http.get('/api/users');
    return response.data;
  } catch (error) {
    alert('Error fetching users:', error);
  }
};

export const addUser = async (user) => {
  try {
    // כאן אין צורך לשלוח את ה-ID
    const { _id, ...userData } = user; // מסננים את ה-ID
    const response = await http.post('/api/users', userData);
    return response.data;
  } catch (error) {
    alert('Error adding user:', error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const { _id, ...userData } = user;
    const response = await http.patch(`/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    alert('Error updating user:', error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await http.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    alert('Error deleting user:', error);
  }
};
