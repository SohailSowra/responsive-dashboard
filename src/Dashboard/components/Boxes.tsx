import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import type { User } from '../Dashboard';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Boxes = ({ filteredUsers }: { filteredUsers: User[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {filteredUsers.map(user => (
        <Card 
          key={user.id} 
          sx={{ 
            minWidth: 300, 
            maxWidth: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6]
            }
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar 
                src={`https://i.pravatar.cc/150?img=${user.id+3}`}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <div>
                <Typography variant="h6" component="div" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  @{user.username}
                </Typography>
              </div>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                <a href={`mailto:${user.email}`} className="hover:underline">
                  {user.email}
                </a>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                {user.phone}
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start" mb={1}>
              <LocationOnIcon color="primary" sx={{ mr: 1, mt: 0.5, fontSize: '1rem' }} />
              <Typography variant="body2">
                {isMobile ? (
                  `${user.address.city}, ${user.address.zipcode}`
                ) : (
                  `${user.address.street}, ${user.address.city}`
                )}
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start">
              <BusinessIcon color="primary" sx={{ mr: 1, mt: 0.5, fontSize: '1rem' }} />
              <div>
                <Typography variant="body2" fontWeight="medium">
                  {user.company.name}
                </Typography>
              </div>
            </Box>
          </CardContent>

          <CardActions sx={{ p: 2 }}>
            <Button
              component={Link}
              to={`/user/${user.id}`}
              size="small"
              color="primary"
              variant="outlined"
              fullWidth
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                letterSpacing: 'normal'
              }}
            >
              View Full Profile
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Boxes;