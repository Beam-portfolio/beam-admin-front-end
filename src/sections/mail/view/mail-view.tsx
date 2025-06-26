'use client';

import { useEffect, useCallback, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
// api
import { fetchMail, fetchMails } from '@/redux/slices/mailsSlice';
// components
import EmptyContent from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
//
import MailHeader from '../mail-header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { MailLabel } from '@/types/mailTypes';

import MailDetails from '../mail-details';
import MailNav from '../mail-nav';
import MailList from '../mail-list';

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

export function MailView() {
  const router = useRouter();
  const { mails, loading: mailsLoading, error: mailsError } = useAppSelector(state => state.mails)
  const { mail, loadingM: mailLoading } = useAppSelector(state => state.mails)
  const [labels, setLabels] = useState<MailLabel[]>([])
  const dispatch = useAppDispatch()
  const mailsEmpty = !mails || mails.length === 0;

  const searchParams = useSearchParams();

  const selectedLabelId = searchParams.get('label') || LABEL_INDEX;

  const selectedMailId = searchParams.get('id') || '';

  const upMd = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const openNav = useBoolean();

  const openMail = useBoolean();

  const openCompose = useBoolean();

  const handleToggleCompose = useCallback(() => {
    if (openNav.value) {
      openNav.onFalse();
    }
    openCompose.onToggle();
  }, [openCompose, openNav]);

  const handleClickMail = useCallback(
    (mailId: string) => {
      if (!upMd) {
        openMail.onFalse();
      }

      const href =
        selectedLabelId !== LABEL_INDEX
          ? `${paths.dashboard.mail}?id=${mailId}&label=${selectedLabelId}`
          : `${paths.dashboard.mail}?id=${mailId}`;

      router.push(href);
    },
    [openMail, router, selectedLabelId, upMd]
  );

  useEffect(() => {
    if (mailsError) {
      router.push(paths.dashboard.root);
    }
  }, [mailsError, router]);

  useEffect(() => {
    if (!selectedMailId && mails[0]) {
      handleClickMail('');
    }
  }, [mails, handleClickMail, selectedMailId]);

  useEffect(() => {
    if (selectedMailId) {
      dispatch(fetchMail(selectedMailId))
    }
  }, [selectedMailId])

  const renderLoading = (
    <LoadingScreen
      sx={{
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    />
  );

  const renderEmpty = (
    <EmptyContent
      title={`Nothing in ${selectedLabelId}`}
      description="This folder is empty"
      imgUrl="/assets/icons/empty/ic_folder_empty.svg"
      sx={{
        borderRadius: 1.5,
        maxWidth: { md: 320 },
        bgcolor: 'background.default',
      }}
    />
  );

  const renderMailNav = (
    <MailNav
      loading={mailsLoading}
      openNav={openNav.value}
      onCloseNav={openNav.onFalse}
      labels={labels}
      selectedLabelId={selectedLabelId}
      handleClickLabel={(id: any) => {
        handleClickMail(id)
        openNav.onFalse();
      }}
      onToggleCompose={handleToggleCompose}
    />
  );

  // console.log();
  

  const renderMailList = (
    <MailList
      mails={mails}
      loading={mailsLoading}
      //
      openMail={openMail.value}
      onCloseMail={openMail.onFalse}
      onClickMail={handleClickMail}
      //
      selectedLabelId={selectedLabelId}
      selectedMailId={selectedMailId}
    />
  );

  const renderMailDetails = (
    <>
      {mailsEmpty || !selectedMailId ? (
        <EmptyContent
          imgUrl="/assets/icons/empty/ic_email_disabled.svg"
          sx={{
            borderRadius: 1.5,
            bgcolor: 'background.default',
            ...(!upMd && {
              display: 'none',
            }),
          }}
        />
      ) : (
        <MailDetails
          mail={mail}
          renderLabel={(id) => labels.filter((label) => label.id === id)[0]}
        />
      )}
    </>
  );

  useEffect(() => {
    dispatch(fetchMails())
  }, [])

  useEffect(() => {
    if (mails) {
      const transformedLabels = mails.map((message: any) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        icon: message.icon
      }));

      setLabels(transformedLabels);
    }
  }, [mails])

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 3, md: 2 },
            mt: 4
          }}
        >
          Mail
        </Typography>

        <Stack
          spacing={1}
          sx={{
            p: 1,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, #2563eb66 0%, #a855f791 100%)`,
          }}
        >
          {!upMd && (
            <MailHeader
              onOpenNav={openNav.onTrue}
              onOpenMail={!mailsEmpty ? null : openMail.onTrue}
            />
          )}

          <Stack
            spacing={1}
            direction="row"
            flexGrow={1}
            sx={{
              height: {
                xs: '72vh',
              },
            }}
          >
            {renderMailNav}

            {mailsEmpty ? renderEmpty : renderMailList}

            {mailLoading ? renderLoading : renderMailDetails}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
