import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { User } from '../Dashboard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';

const Tables = ({ filteredUsers }: { filteredUsers: User[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getCellClasses = () => 
    `p-2 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'}`;

  const getHeaderClasses = () =>
    `font-bold ${isMobile ? 'text-xs' : 'text-sm'} bg-gray-100 sticky top-0`;

  const renderCompactText = (text: string, maxChars: number) => {
    if (!isMobile) return text;
    return text.length > maxChars ? `${text.substring(0, maxChars)}...` : text;
  };

  return (
    <TableContainer 
      component={Paper} 
      className="border border-gray-200 shadow-sm"
      style={{ maxHeight: 'calc(100vh - 200px)' }} 
    >
      <Table 
        aria-label="users table" 
        size={isMobile ? 'small' : 'medium'}
        sx={{ tableLayout: 'fixed' }} 
      >
        <colgroup>
          {!isMobile && <col style={{ width: '5%' }} />} 
          <col style={{ width: isMobile ? '25%' : '15%' }} /> 
          {!isMobile && <col style={{ width: '12%' }} />} 
          <col style={{ width: isMobile ? '23%' : '20%' }} /> 
          <col style={{ width: isMobile ? '20%' : '20%' }} /> 
          <col style={{ width: isMobile ? '20%' : '20%' }} /> 
          <col style={{ width: '10%' }} /> 
        </colgroup>

        <TableHead>
          <TableRow>
            {!isMobile && (
              <TableCell className={getHeaderClasses()}>ID</TableCell>
            )}
            <TableCell className={getHeaderClasses()}>Name</TableCell>
            {!isMobile && (
              <TableCell className={getHeaderClasses()}>Username</TableCell>
            )}
            <TableCell className={getHeaderClasses()}>Email</TableCell>
            <TableCell className={getHeaderClasses()}>
              {isMobile ? 'Location' : 'Address'}
            </TableCell>
            <TableCell className={getHeaderClasses()}>Company</TableCell>
            <TableCell className={getHeaderClasses()}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow 
              key={user.id} 
              hover 
              className="hover:bg-gray-50 even:bg-gray-50"
            >
              {!isMobile && (
                <TableCell className={getCellClasses()}>{user.id}</TableCell>
              )}
              <TableCell className={`${getCellClasses()} font-medium`}>
                <Tooltip title={user.name} enterDelay={500}>
                  <span>{renderCompactText(user.name, 10)}</span>
                </Tooltip>
              </TableCell>
              {!isMobile && (
                <TableCell className={getCellClasses()}>
                  @{user.username}
                </TableCell>
              )}
              <TableCell className={getCellClasses()}>
                <Tooltip title={user.email} enterDelay={500}>
                  <div className='block truncate'> 
                    {renderCompactText(user.email, isMobile ? 15 : 25)}
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell className={getCellClasses()}>
                <Tooltip 
                  title={`${user.address.street}, ${user.address.city}`} 
                  enterDelay={500}
                >
                  <span className="block truncate">
                    {isMobile ? user.address.city : `${user.address.street}, ${user.address.city}`}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell className={getCellClasses()}>
                <Tooltip title={user.company.name} enterDelay={500}>
                  <span className="block truncate">
                    {isMobile ? renderCompactText(user.company.name, 10) : user.company.name}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell className={getCellClasses()}>
                <Link 
                  to={`/user/${user.id}`} 
                  className="text-blue-600 hover:text-blue-800 flex justify-center"
                  aria-label="View user details"
                >
                  <VisibilityIcon fontSize={isMobile ? 'small' : 'medium'} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;