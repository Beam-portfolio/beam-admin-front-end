import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { SxProps } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';

type TLink = {
  href?: string;
  name: string;
  icon?: React.ReactElement;
  disabled?: boolean;
};

type Props = {
  links: TLink[];
  heading?: string;
  sx?: SxProps;
};

export default function CustomBreadcrumbs({ links, heading, sx }: Props) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Stack spacing={2}>
        {heading && <Typography variant="h4">{heading}</Typography>}

        <Breadcrumbs separator={<span>&gt;</span>}>
          {links.map((link) => (
            <Link
              key={link.name}
              component={RouterLink}
              href={link.href || '#'}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {link.icon && <Box sx={{ mr: 1 }}>{link.icon}</Box>}
              {link.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}
