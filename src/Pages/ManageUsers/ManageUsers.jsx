import { useEffect, useState } from 'react';
import UserForm from '../../Componesnts/UserForm/Userform';
import Userlist from '../../Componesnts/UserList/UserList';
import './ManageUser.css';
import { fetchUsers } from '../../Service/UserService.js';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        if (error.response?.status === 302) {
          // Axios treats 302 as error, but data is still available
          setUsers(error.response.data);
        } else {
          console.error(error);
          toast.error("Unable to fetch Users");
        }
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column overflow-auto">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <Userlist users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;