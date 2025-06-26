'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
// components
import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import { useSnackbar } from 'src/components/snackbar';
// types
import { IUserItem } from 'src/types/user';
// hooks
// routes
import { paths } from 'src/routes/paths';
// sections
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchUsers, deleteUser, updateUser, createUser } from 'src/redux/slices/userSlice';
import { fetchRoles } from 'src/redux/slices/roleSlice';
import { UserTableRow, UserTableToolbar } from '../user-table';
import { IUser } from 'src/types/user';
import UserDialog from '../user-dialog';
import { Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import BookingWidgetSummary from '@/sections/dashboard/widget-summary';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'User' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'Last Active', label: 'Last Active' },
  { id: 'actions', label: 'Actions' },
];

export default function UserListView() {
  // const settings = useSettingsContext();
  const dispatch = useAppDispatch();
  const { users = [], error } = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUserItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState('all');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleDeleteUser = useCallback(
    async (userId: number) => {
      try {
        setLoading(true);
        await dispatch(deleteUser(userId)).unwrap();
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        setLoading(false);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error || 'Failed to delete user', { variant: 'error' });
        setLoading(false);
      }
    },
    [dispatch, enqueueSnackbar]
  );

  const handleOpenEdit = (user: any) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCreateUser = async (data: any) => {
    try {
      await dispatch(createUser(data)).unwrap();
      setOpenDialog(false);
      enqueueSnackbar('User created successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to create user', { variant: 'error' });
    }
  };

  const handleEditUser = async (data: any) => {
    try {
      await dispatch(updateUser({ id: currentUser!.id, data })).unwrap();
      setOpenDialog(false);
      setCurrentUser(null);
      enqueueSnackbar('User updated successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users
        .map((user: IUser) => ({
          ...user,
          isActive: user.status === 'active',
          lastActiveAt: (lastActiveAt: any) => user.updatedAt || '',
        }))
        .filter(
          (user: IUserItem) =>
            (`${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(filterName.toLowerCase()) ||
              user.email.toLowerCase().includes(filterName.toLowerCase())) &&
            (currentRole === 'all' || user.roles.some((role: any) => role.name === currentRole))
        )
    : [];

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Card>
        <CustomBreadcrumbs heading="Users Management" links={[]} sx={{ mb: { xs: 3, md: 5 } }} />
        <Grid container spacing={3}>
          {[0, 1, 2].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BookingWidgetSummary
                title={['Administrators', 'Moderators', 'Support Staff', 'Replied'][index]}
                total={["8", "12", "24"][index]}
                color={
                  ['rgba(219, 234, 254, 1)', 'rgba(209, 250, 229, 1)', 'rgba(237, 233, 254, 1)'][
                    index
                  ]
                }
                type={['info', 'info', 'info', 'info'][index]}
                icon={
                  <Icon
                    color={['#2563eb', '#059669', '#7c3aed'][index]}
                    icon={
                      [
                        'material-symbols:person-shield',
                        'fluent:person-tag-20-filled',
                        'material-symbols:person',
                      ][index]
                    }
                    width="20"
                    height="20"
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      </Card>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={(e) => setFilterName(e.target.value)}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredUsers.length}
                numSelected={selected.length}
                onSort={(id) => {
                  setOrderBy(id);
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                }}
                onSelectAllRows={(checked) =>
                  setSelected(
                    checked ? filteredUsers.map((row: IUserItem) => row.id.toString()) : []
                  )
                }
              />

              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: IUser) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id.toString())}
                      onSelectRow={() => {
                        const selectedIndex = selected.indexOf(row.id.toString());
                        let newSelected: string[] = [];
                        if (selectedIndex === -1) {
                          newSelected = newSelected.concat(selected, row.id.toString());
                        } else if (selectedIndex === 0) {
                          newSelected = newSelected.concat(selected.slice(1));
                        } else if (selectedIndex === selected.length - 1) {
                          newSelected = newSelected.concat(selected.slice(0, -1));
                        } else if (selectedIndex > 0) {
                          newSelected = newSelected.concat(
                            selected.slice(0, selectedIndex),
                            selected.slice(selectedIndex + 1)
                          );
                        }
                        setSelected(newSelected);
                      }}
                      onDeleteRow={() => handleDeleteUser(row.id)}
                      onEditRow={() => handleOpenEdit(row)}
                      loading={loading}
                    />
                  ))}

                <TableNoData notFound={!filteredUsers.length && !!filterName} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setPage(0);
            setRowsPerPage(Number(e.target.value));
          }}
        />
      </Card>

      <UserDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setCurrentUser(null);
        }}
        onSubmit={currentUser ? handleEditUser : handleCreateUser}
        currentUser={currentUser}
      />
    </Container>
  );
}
