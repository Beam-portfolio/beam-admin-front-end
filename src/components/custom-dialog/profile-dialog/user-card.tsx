// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// assets
import { AvatarShape } from 'src/assets/illustrations';
import { fDate } from '@/utils/format-time';
// components

// ----------------------------------------------------------------------
export type IUserCard = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  phoneNumber: number;
  dateOfBirth: string;
  createdAt: string;
  bookings: any[];
  interests: any[];
  credits: number;
  status: string;
};

type Props = {
  user: IUserCard;
};

export default function UserCard({ user }: Props) {
  const { name, role, dateOfBirth, phoneNumber, avatarUrl, createdAt, email } = user;
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Box
          sx={{
            backgroundColor: '#ccc',
            height: 160,
            borderRadius: 1,
            position: 'relative',
          }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={name}
        secondary={role}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
            p: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            width: '40%',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Email: {email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Phone: {phoneNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Birth Day: {fDate(dateOfBirth)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Joined: {fDate(createdAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
            p: 1,
            borderRadius: 1,
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            width: '40%',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Status: {user.status.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Services: {user.bookings.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Interests: {user.interests.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Credits: {user.credits}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ py: 3, typography: 'subtitle1' }}
      >
        <Box>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Services
          </Typography>
          <Box sx={{ p: 2 }}>
            {user.bookings.map((book) => (
              <Box
                key={book.service.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                  p: 1,
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={book.service.images[0]}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    mr: 1,
                  }}
                />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {book.service.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Interests
          </Typography>
          <Box sx={{ p: 2 }}>
            {user.interests.map((interest) => (
              <Box
                key={interest.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                  p: 1,
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={interest.image}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    mr: 1,
                  }}
                />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {interest.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
