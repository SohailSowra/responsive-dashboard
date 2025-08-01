import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Card, CardContent, Typography, Skeleton, Divider, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import type { User } from '../Dashboard';
import { toast } from 'react-toastify';

const Users = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error('Error fetching user:' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <IconButton
        component={Link}
        to="/"
        className="mb-4"
        aria-label="back to list"
        sx={{ color: 'white' }}
      >
        <ArrowBackIcon className="mr-2" />
        <Typography variant="subtitle1">Back to List</Typography>
      </IconButton>

      <Card className="shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="text" width={200} height={40} />
              </div>
              <Divider className="my-4" />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} variant="text" width="100%" height={30} />
              ))}
            </div>
          </CardContent>
        ) : user ? (
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <Avatar
                sx={{ width: 80, height: 80 }}
                src={`https://i.pravatar.cc/150?img=${user.id+4 }`}
                alt={user.name}
              />
              <div>
                <Typography variant="h4" component="h1" className="font-bold">
                  {user.name}
                </Typography>
                <Chip
                  label={`@${user.username}`}
                  color="primary"
                  size="small"
                  className="mt-2"
                />
              </div>
            </div>

            <Divider className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <EmailIcon color="primary" className="mr-3 mt-1" />
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      <a href={`mailto:${user.email}`} className="hover:underline">
                        {user.email}
                      </a>
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start">
                  <HomeIcon color="primary" className="mr-3 mt-1" />
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">
                      Address
                    </Typography>
                    <Typography variant="body1">
                      {user.address.street}<br />
                      {user.address.suite}<br />
                      {user.address.city}, {user.address.zipcode}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      (Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng})
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <PhoneIcon color="primary" className="mr-3 mt-1" />
                  <div className='w-full'>
                    <Typography variant="subtitle2" color="textSecondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {user.phone}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start">
                  <LanguageIcon color="primary" className="mr-3 mt-1" />
                  <div className='w-full'>
                    <Typography variant="subtitle2" color="textSecondary">
                      Website
                    </Typography>
                    <Typography variant="body1">
                      {user.website}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start">
                  <BusinessIcon color="primary" className="mr-3 mt-1" />
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">
                      Company
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      {user.company.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.company.catchPhrase}
                    </Typography>
                    <Chip
                      label={user.company.bs}
                      size="small"
                      className="mt-1"
                      icon={<WorkOutlineIcon fontSize="small" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body1" color="error">
              User not found
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Users;