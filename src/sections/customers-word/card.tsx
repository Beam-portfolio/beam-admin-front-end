import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { ConfirmDialog } from '@/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { LoadingButton } from '@mui/lab';

interface CustomerWordCardProps {
  id: number;
  name: string;
  nickName: string;
  word: string;
  avatar?: string;
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
}
export default function CustomerWordCard({ id, name, nickName, word, avatar, onEdit, onDelete }: CustomerWordCardProps) {
  const confirm = useBoolean()
  const Loading = useBoolean()

  return (
    <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', boxShadow: 2, background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)`, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
        <IconButton size="small" onClick={onEdit} aria-label="edit">
          <EditIcon color="primary" fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={confirm.onTrue} aria-label="delete" color="error">
          <DeleteIcon color="error" fontSize="small" />
        </IconButton>
      </Box>
      <Avatar
        sx={{ width: 64, height: 64, mx: 'auto', mb: 2, fontSize: 32, border: '1px solid #2563eb'  }}
        src={avatar || undefined}
      >
        {!avatar && name[0]}
      </Avatar>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 2 }}>
        “{word}”
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {nickName}
      </Typography>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete Testimonial"
        content={
          <>
            Are you sure you want to delete this  testimonial?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={async () => {
              Loading.onTrue()
              await onDelete?.();
              confirm.onFalse();
            }}
            loading={Loading.value}
          >
            Delete
          </LoadingButton>
        }
      />
    </Card>
  );
}
