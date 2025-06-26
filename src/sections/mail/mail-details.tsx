import PropTypes from 'prop-types';
// @mui
import { darken, lighten, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDateTime } from 'src/utils/format-time';
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';
import EmptyContent from 'src/components/empty-content';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeNewReply, createReply, fetchMails } from '@/redux/slices/mailsSlice';
import { useRouter, useSearchParams } from 'src/routes/hooks';

//validation
import * as Yup from 'yup'
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ConfirmDialog } from '@/components/custom-dialog';
import { LoadingButton } from '@mui/lab';
import { useBoolean } from '@/hooks/use-boolean';
import axiosInstance from '@/utils/axios';
import { paths } from '@/routes/paths';

const messageSchema = Yup.object().shape({
  message: Yup.string().min(15).max(500).required('message content is require'),
  subject: Yup.string().min(5).max(100).required('message content is require'),
})

// ----------------------------------------------------------------------

export default function MailDetails({ mail }: any) {
  const { newMailReply } = useAppSelector(state => state.mails)
  const dispatch = useAppDispatch()
  const confirm = useBoolean()
  const Loading = useBoolean()
  const [errors, setErrors] = useState({ message: '', subject: '' })
  const searchParams = useSearchParams();

  const router = useRouter()

  const handleSave = async () => {
    try {
      await messageSchema.validateSync(newMailReply)
      await dispatch(createReply({ id: mail.id, messageData: { ...newMailReply, messageId: mail.id } }))
      await dispatch(fetchMails())
      dispatch(changeNewReply({ value: '', field: 'message' }))
      dispatch(changeNewReply({ value: '', field: 'subject' }))
      dispatch(changeNewReply({ value: '', field: 'messageId' }))
      enqueueSnackbar('Reply created successfully!', { variant: 'success' });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        if (error.message.includes('subject')) {
          setErrors({ subject: error.message as string, message: '' })
        } else {
          setErrors({ message: error.message as string, subject: '' })
          enqueueSnackbar('Somthing went Wrong!', { variant: 'error' });

        }
      }
    }

  }

  const onDelete = async (mailId: string) => {
    try {
      await axiosInstance.delete(`/messages/${mailId}`)
      await dispatch(fetchMails())
      const selectedMailId = searchParams.get('id') || '';
      const href =
      selectedMailId &&
      `${paths.dashboard.mail}?id=${''}`;
      router.push(href);
      enqueueSnackbar('Mail deleted successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Somthing went Wrong!', { variant: 'error' });
    }
  }

  if (!mail) {
    return (
      <EmptyContent
        title="No Conversation Selected"
        description="Select a conversation to read"
        imgUrl="/assets/icons/empty/ic_email_selected.svg"
        sx={{
          borderRadius: 1.5,
        }}
      />
    );
  }

  const renderHead = (
    <Stack direction="row" alignItems="center" flexShrink={0} sx={{ height: 56, pl: 2, pr: 1 }}>

      <Stack direction="row" alignItems="center">
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={mail.isStarred}
        />

        <Checkbox
          color={'primary'}
          icon={<Iconify icon="material-symbols:label-important-rounded" />}
          checkedIcon={<Iconify icon="material-symbols:label-important-rounded" />}
          checked={mail.isImportant}
        />

        <Tooltip title="Archive">
          <IconButton>
            <Iconify icon="solar:archive-down-minimlistic-bold" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Mark Unread">
          <IconButton>
            <Iconify icon="fluent:mail-unread-20-filled" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Trash">
          <IconButton
            onClick={() => {
              confirm.onTrue()
            }}
          >
            <Iconify color={'error.main'} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>

        <IconButton>
          <Iconify color={'primary.main'} icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>
    </Stack>
  );

  const renderSubject = (
    <Stack spacing={2} direction="row" flexShrink={0} sx={{ p: 2 }}>
      <TextMaxLine variant="subtitle2" sx={{ flexGrow: 1 }}>
        Re: {mail.subject}
      </TextMaxLine>

      <Stack spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <IconButton size="small">
            <Iconify color={'primary.main'} width={18} icon="solar:reply-bold" />
          </IconButton>

          <IconButton size="small">
            <Iconify color={'primary.main'} width={18} icon="solar:multiple-forward-left-broken" />
          </IconButton>

          <IconButton size="small">
            <Iconify color={'primary.main'} width={18} icon="solar:forward-bold" />
          </IconButton>
        </Stack>

        <Typography variant="caption" noWrap sx={{ color: 'primary.main' }}>
          {fDateTime(mail.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSender = (
    <Stack
      flexShrink={0}
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 2, 1, 2),
      }}
    >
      <Avatar alt={mail.name} src={`${mail.name}`} sx={{ mr: 2, border: '1px solid rgb(28, 28, 124)' }}>
        {mail.name.charAt(0).toUpperCase()}
      </Avatar>

      <ListItemText
        primary={
          <>
            {mail.name}
            <Box component="span" sx={{ typography: 'body2', color: 'primary.main' }}>
              {` : ${mail.email}`}
            </Box>
          </>
        }
        secondary={
          <>
            {`To: `}
            <Link key={'admin'} sx={{ color: 'primary.main' }}>
              {`t.beam.securty@gmail.com`}
            </Link>
          </>
        }
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          component: 'span',
          typography: 'caption',
        }}
      />
    </Stack>
  );

  const renderContent = (
    <Box sx={{ py: 0, ml: 8 }}>
      <Scrollbar>
        <Markdown
          children={mail.message}
          sx={{
            px: 2,
            whiteSpace: 'pre-line',
            '& p': {
              typography: 'body2',
              whiteSpace: 'pre-line',
            },
          }}
        />

      </Scrollbar>
    </Box>
  );

  const renderEditor = (
    <Stack
      spacing={2}
      sx={{
        p: (theme) => theme.spacing(0, 2, 2, 2),
        mt: 2
      }}
    >
      <TextField fullWidth multiline rows={4} placeholder='Message...' id="reply-mail" sx={{
        '& .MuiInputBase-input::placeholder': {
          color: 'primary.main',
          opacity: 1,
        },
      }}
        error={Boolean(errors.message)}
        helperText={errors.message}
        onChange={(e) => {
          setErrors({ subject: '', message: '' })
          dispatch(changeNewReply({ value: e.target.value, field: 'message' }))
        }}
        value={newMailReply.message}
      />
      <Stack direction="row" gap={2} alignItems="center" justifyContent={'flex-end'}>
        <TextField
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: 'primary.main',
              opacity: 1,
            },
          }}
          onChange={(e) => {
            setErrors({ subject: '', message: '' })
            dispatch(changeNewReply({ value: e.target.value, field: 'subject' }))
          }}
          error={Boolean(errors.subject)}
          helperText={errors.subject}
          value={newMailReply.subject}
          size='small' fullWidth name='subject' placeholder='Subject' />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Iconify icon="iconamoon:send-fill" />}
          onClick={handleSave}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );

  const renderReplies = (
    <Stack>
      {mail.replies.map((reply: any) => (
        <Stack key={reply.id}>
          <Stack
            flexShrink={0}
            direction="row"
            alignItems="center"
            sx={{
              p: (theme) => theme.spacing(2, 2, 1, 2),
            }}
          >
            <Avatar alt={'Beam Reply'} src={`Beam Reply`} sx={{ mr: 2, border: '1px solid rgb(28, 28, 124)' }}>
              {'Beam Reply'.charAt(0).toUpperCase()}
            </Avatar>

            <ListItemText
              primary={
                <>
                  {'Beam Reply'}
                  <Box component="span" sx={{ typography: 'body2', color: 'primary.main' }}>
                    {` : t.beam.securty@gmail.com`}
                  </Box>
                </>
              }
              secondary={
                <>
                  {`To: `}
                  <Link key={'admin'} sx={{ color: 'primary.main' }}>
                    {mail.email}
                  </Link>
                </>
              }
              secondaryTypographyProps={{
                mt: 0.5,
                noWrap: true,
                component: 'span',
                typography: 'caption',
              }}
            />
          </Stack>
          <Box sx={{ py: 0, flexGrow: 1, ml: 8 }}>
            <Scrollbar>
              <Markdown
                children={reply.message}
                sx={{
                  px: 2,
                  whiteSpace: 'pre-line',
                  '& p': {
                    typography: 'body2',
                    whiteSpace: 'pre-line',
                  },
                }}
              />
            </Scrollbar>
          </Box>
          <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />
        </Stack>
      ))}
    </Stack>
  )

  return (
    <Stack
      flexGrow={1}
      sx={{
        width: 1,
        minWidth: 0,
        borderRadius: 1.5,
        background: `#fff`,
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSubject}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSender}

      {renderContent}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
        <Box sx={{ width: '10%', minWidth: 40, height: '2px', bgcolor: 'divider' }} />
        <Typography variant="caption" sx={{ px: 1, color: 'text.secondary', whiteSpace: 'nowrap' }}>
          Replies
        </Typography>
        <Box sx={{ flex: 1, height: '2px', bgcolor: 'divider' }} />
      </Box>

      {mail.replies && mail.replies.length > 0 &&
        renderReplies
      }

      {renderEditor}
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
              await onDelete(mail.id);
              Loading.onFalse()
              confirm.onFalse();
            }}
            loading={Loading.value}
          >
            Delete
          </LoadingButton>
        }
      />
    </Stack>
  );
}

MailDetails.propTypes = {
  mail: PropTypes.object,
  renderLabel: PropTypes.func,
};
