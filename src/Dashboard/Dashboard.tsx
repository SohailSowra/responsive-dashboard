import { useEffect, useState } from 'react'
import axios from 'axios'
import Switch from '@mui/material/Switch';
import Tables from './components/Tables';
import Boxes from './components/Boxes';
import { toast } from 'react-toastify';
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: number;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [changeLayout, setChangeLayout] = useState(true);
  const [loading, setLoading] = useState(true);
  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
       toast.error("Failed to fetch user data. Please try again.");
        setLoading(false);
      });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredUsers);
  }

  return (
    <>
      <div>
        <h1>User List</h1>
        <div className='flex items-center justify-between  mb-10'>
          <div className='flex items-center gap-2'>
            <label>{changeLayout ? 'Card Layout' : 'Table Layout'}</label>
            <Switch checked={changeLayout} onChange={() => setChangeLayout(!changeLayout)} />
          </div>
          <div className='flex  justify-around'>
            <label className='self-center mr-2'>Search Users:</label>
            <input
              type='text'
              className='w-60 p-2 border rounded-md'
              placeholder='Search by name & email'
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (<div>
        {changeLayout ? (
          // Card layout
          <Boxes filteredUsers={filteredUsers} />
        ) : (
          // Table layout
          <Tables filteredUsers={filteredUsers} />
        )}
      </div>
      )
      }
    </>
  )
}

export default Dashboard;
