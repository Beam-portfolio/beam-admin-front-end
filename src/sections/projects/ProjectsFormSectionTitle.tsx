import { Typography, Box } from '@mui/material';

interface ProductFormSectionTitleProps {
  title: string;
}

export default function ProductFormSectionTitle({ title }: ProductFormSectionTitleProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 0.2 }}>
        {title}
      </Typography>
    </Box>
  );
}
