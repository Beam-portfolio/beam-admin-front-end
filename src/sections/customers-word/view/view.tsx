"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/redux/hooks';
import { useSettingsContext } from 'src/components/settings';
import { fetchCustomerWords, openCreateDialog, closeCreateDialog, setError, setEditMode, changeNewCustomerWord, deleteCustomerWord, setLadingB } from '@/redux/slices/customerWordSlice';
import { LoadingScreen } from 'src/components/loading-screen';
import NotFoundPage from '@/app/not-found';
import { Grid } from '@mui/material';
import CustomerWordCard from '../card';
import { CreateCustomerWordDialog } from '@/components/custom-dialog/createCustomerWordDialog';
import { getFileNameFromUrl } from '@/utils/file';
import axiosInstance from '@/utils/axios';
import { enqueueSnackbar } from 'notistack';


export function CustomerWordView() {
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();

  const customerWords = useSelector((state: any) => state.customerWord.customerWords);
  const loading = useSelector((state: any) => state.customerWord.isLoading);
  const error = useSelector((state: any) => state.customerWord.error);
  const open = useSelector((state: any) => state.customerWord.open);
  const editMode = useSelector((state: any) => state.customerWord.editMode);
  const newCustomerWord = useSelector((state: any) => state.customerWord.newCustomerWord);

  useEffect(() => {
    dispatch(fetchCustomerWords());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <NotFoundPage />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}
      >
        <Box>
          <Typography variant="h4">Customer Words</Typography>
        </Box>
        <LoadingButton
          color="inherit"
          variant="contained"
          onClick={() => dispatch(openCreateDialog())}
          sx={{ height: '3em' }}
        >
          Add Testimonial
        </LoadingButton>
      </Container>
      <Box
        sx={{
          mt: 5,
          width: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { sx: 'center', sm: 'flex-start' },
          alignItems: { sx: 'center', sm: 'flex-start' },
          gap: 5,
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 2,
        }}
      >
        {Array.isArray(customerWords) && customerWords.length > 0 ? (
          <Grid container spacing={1}>
            {customerWords.map(({ id, name, nickName, word, avatar }: any) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
                <CustomerWordCard
                  id={id}
                  name={name}
                  nickName={nickName}
                  word={word}
                  avatar={avatar}
                  onEdit={() => {
                    dispatch(changeNewCustomerWord({ field: 'name', value: name }));
                    dispatch(changeNewCustomerWord({ field: 'nickName', value: nickName }));
                    dispatch(changeNewCustomerWord({ field: 'word', value: word }));
                    dispatch(changeNewCustomerWord({ field: 'avatar', value: avatar }));
                    dispatch(setEditMode(id));
                    dispatch(openCreateDialog());
                  }}
                  onDelete={async () => {
                    const fileName = getFileNameFromUrl(avatar);
                    if (fileName) {
                      try {
                        await axiosInstance.delete(`/v1/files/${fileName}`);
                        await dispatch(deleteCustomerWord(id) as any);
                        dispatch(fetchCustomerWords());
                      } catch (err) {
                        enqueueSnackbar('Failed to delete testimonial', { variant: 'error' });
                      }}
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ py: 5, textAlign: 'center', width: '100%' }}>
            No testimonials found.
          </Typography>
        )}
      </Box>
      <CreateCustomerWordDialog open={open} onClose={() => dispatch(closeCreateDialog())} />
    </Container>
  );
}
