import { useEffect, useState } from 'react'
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
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom'


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

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [changeLayout, setChangeLayout] = useState(true);
  const [loading, setLoading] = useState(true);
  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () =>{
  setLoading(true);
  axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
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
      <Switch checked={changeLayout} onChange={() => setChangeLayout(!changeLayout)}/>
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }} className="items-center justify-center  ">
        {/* Map through users and create a Card for each user */}
        {filteredUsers.map(user => (
          <Card key={user.id} sx={{ minWidth: 350, maxWidth: 350, minHeight: 250, overflow: 'auto' }} className='relative'>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.name}
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
              <Typography variant="body2">
                {user.company.name}
              </Typography>
              <Typography variant="body2">
                {user.company.catchPhrase}
              </Typography>
              <Typography variant="body2">
                {user.company.bs}
              </Typography>
            </CardContent>
            <CardActions className='absolute bottom-0 left-0 right-0'>
              <Link to={`/user/${user.id}`}>View Details</Link>
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
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through users and create a TableRow for each user */}
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                </TableCell>
                <TableCell>
                  {user.company.name} - {user.company.catchPhrase} ({user.company.bs})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
      </div>
      )
      }
    </>
  )
}

export default Dashboard;
