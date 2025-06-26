// @mui
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: string;
  icon: React.ReactElement;
  type: string;
}

export default function BookingWidgetSummary({
  title,
  total,
  icon,
  color,
  type,
  sx,
  ...other
}: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
        p: 2,
        pl: 3,
        
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          display: 'flex',
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Box
          sx={{
            color: 'text.secondary',
            typography: 'h6',
            fontWeight: 'normal',
            m: 0,
            p: 0,
            fontSize: '14px !important',
          }}
        >
          {title}
        </Box>
        <Box
          sx={{
            mb: 1,
            typography: 'h4',
            color: '$000',
            fontWeight: 'bold',
            m: 0,
            p: 0,
            fontSize: '18px !important',
          }}
        >
          {type === 'area' ? `$ ${fShortenNumber(+total)}` : total}
        </Box>
      </Box>
    </Card>
  );
}
