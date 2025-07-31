import { useEffect,useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { Avatar, Paper, Skeleton } from '@mui/material';

interface User {
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
const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const userID = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${userID.id}`)
      .then(response => {
        setUsers([response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };


  return (
    <>
        <div>
        <Link to="/">Back to Dashboard</Link>
        <Paper sx={{ padding: 2, margin: 2 }}>
          <h1>User Details</h1>
              {loading ? (
                <div className="flex flex-col items-center justify-center">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={450} height={20} />
                <Skeleton variant="text" width={300} height={20} />
                <Skeleton variant="text" width={300} height={20} />
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={200} height={20} />
                </div>
              ) : (
              <>
          {users.map(user => (
            <div key={user.id}>
              <Avatar sx={{ width: 60, height: 60 }} src={`https://i.pravatar.cc/150?img=${user.id}`} alt={user.name} />
              <h2>Name: {user.name}</h2>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p>Company: {user.company.name}</p>
              </div>
          ))}
          </>
        )}
        </Paper>
        </div>
    </>
  );
}

export default Users
