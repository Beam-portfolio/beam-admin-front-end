import { Box, Typography, IconButton, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { useAppDispatch } from '@/redux/hooks';
import { changeNewService, deleteService, fetchServices, openCreateDialog, setEditMode } from '@/redux/slices/serviceSlice';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

interface ServiceCardProps {
  title: string;
  desc?: string;
  icon: string;
  color?: string;
  id: string;
}

export default function ServiceCard({ title, desc, icon, color, id }: ServiceCardProps) {
  const confirm = useBoolean();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const handleDelete = async () => {
    try {
      await dispatch(deleteService(Number(id)));
      await dispatch(fetchServices());
      toast.success('Deleted successfully.');
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  const colorMap: Record<string, string> = {
    'blue-200': '#bfdbfe',
    'purple-200': '#e9d5ff',
    'red-200': '#fecaca',
    'green-200': '#bbf7d0',
  };



  let gradient = 'linear-gradient(135deg, #bfdbfe 0%, #e9d5ff 100%)';
if (color && typeof color === 'object' && 'from' in color && 'to' in color) {
  gradient = `linear-gradient(135deg, ${(color as any).from} 0%, ${(color as any).to} 100%)`;
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={1}
        sx={{
          opacity: 0.6,
          transition: 'opacity 0.2s',
          mt: 2,
          '&:hover': { opacity: 1 },
          borderTop: `1px solid ${theme.palette.primary.main}`,
          pt: 2
        }}
      >
        <IconButton
          color="primary"
          onClick={() => {
            dispatch(setEditMode(id));
            dispatch(changeNewService({ value: title, field: 'title' }));
            dispatch(changeNewService({ value: desc, field: 'desc' }));
            dispatch(changeNewService({ value: icon, field: 'icon' }));
            dispatch(changeNewService({ value: color || {from: '#3b82f6', to: '#a855f7'}, field: 'color' }));
            dispatch(changeNewService({ value: id, field: 'id' }));
            dispatch(openCreateDialog());
          }}
          sx={{
            background: 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 1,
            '&:hover': { opacity: 1 },
            width: '45%',
          }}
        >
          <Icon icon="fluent:edit-24-filled" width="24" height="24" />
        </IconButton>
        <IconButton
          color="error"
          onClick={confirm.onTrue}
          sx={{
            background: 'transparent',
            border: `1px solid ${theme.palette.error.main}`,
            borderRadius: 1,
            '&:hover': { opacity: 1 },
            width: '45%',
          }}
        >
          <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
        </IconButton>
      </Stack>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete Service"
        content={
          <>
            Are you sure you want to delete <strong>{title}</strong>?
          </>
        }
        action={
          <button
            style={{ background: '#FF5630', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => {
              handleDelete();
              confirm.onFalse();
            }}
          >
            Delete
          </button>
        }
      />
    </Box>
  );
}