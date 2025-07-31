import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [changeLayout, setChangeLayout] = useState(true);
  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () =>{
  axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  return (
    <>
    <div>
      <h1>User List</h1>
      <button onClick={() => setChangeLayout(!changeLayout)} className='my-4 p-2 bg-blue-500 text-white rounded'>
        Toggle Layout
      </button>
      <div>
        <label className='block mb-2'>Search Users:</label>
        <input
          type='text'
          className='w-full p-2 border rounded'
          placeholder='Search by name...'
          onChange={(e) => {
            const user= e.target.value.toLowerCase();
          }}
        />
      </div>
      </div>
    {changeLayout ? (
      // Card layout
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }} className="items-center justify-center  ">
        {/* Map through users and create a Card for each user */}
        {users.map(user => (
          <Card key={user.id} sx={{ minWidth: 275, maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.name}``
              </Typography>
              <Typography color="text.secondary">
                {user.username}
              </Typography>
              <Typography variant="body2">
                {user.email}
              </Typography>
              <Typography variant="body2">
                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    ): (
      // Table layout
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through users and create a TableRow for each user */}
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
    </>
  )
}

export default App
