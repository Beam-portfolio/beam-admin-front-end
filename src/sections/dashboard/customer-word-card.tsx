import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface CustomerWordCardProps {
  id: number;
  name: string;
  nickName: string;
  word: string;
  avatar?: string;
}
export default function CustomerWordCard({ id, name, nickName, word, avatar }: CustomerWordCardProps) {

  return (
    <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', boxShadow: 2, background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)`, position: 'relative' }}>
      <Avatar
        sx={{ width: 64, height: 64, mx: 'auto', mb: 2, fontSize: 32, border: '1px solid #2563eb' }}
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
    </Card>
  );
}
