import { Box, Typography, IconButton, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

interface ServiceCardProps {
  title: string;
  desc?: string;
  icon: string;
  color?: string;
  id: string;
}

export default function ServiceCard({ title, desc, icon, color, id }: ServiceCardProps) {

  const colorMap: Record<string, string> = {
    'blue-200': '#bfdbfe',
    'purple-200': '#e9d5ff',
    'red-200': '#fecaca',
    'green-200': '#bbf7d0',
  };



  let gradient = 'linear-gradient(135deg, #bfdbfe 0%, #e9d5ff 100%)';
if (color && typeof color === 'object' && 'from' in color && 'to' in color) {
  gradient = `linear-gradient(135deg, ${(color as any)?.from} 0%, ${(color as any)?.to} 100%)`;
} else if (typeof color === 'string') {
  const collors = color.split(' '); 
  if (collors.length === 2) {
    const from = collors[0].replace('from-', ''); 
    const to = collors[1].replace('to-', '');     
    const fromHex = colorMap[from] || '#bfdbfe';
    const toHex = colorMap[to] || '#e9d5ff';
    gradient = `linear-gradient(135deg, ${fromHex} 0%, ${toHex} 100%)`;
  }
}




  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 1,
        p: 2,
        minHeight: 180,
        height: 180,
        mb: 0,
        width: '100%',
        minWidth: 0,
        background: gradient,
        boxShadow: '10px 10px 24px 0px rgba(80,80,180,0.08), 10px 10px 24px 0px rgba(80,80,180,0.08) ',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon icon={icon || "mdi:globe"} width={32} height={32} color={color || "#00e0ff"} />
        <Typography variant="h6" fontWeight="bold" color="#222357" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      {desc && (
        <Typography
          variant="body2"
          color="#5a5a89"
          sx={{
            ml: '42px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            maxHeight: 40,
          }}
        >
          {desc}
        </Typography>
      )}
    </Box>
  );
}