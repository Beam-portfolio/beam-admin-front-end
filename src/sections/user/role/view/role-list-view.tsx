'use client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Container, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useTable, TableNoData, TableHeadCustom, TableSelectedAction } from 'src/components/table';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchRoles, deleteRole, createRole, updateRole } from 'src/redux/slices/roleSlice';
import { IRole } from 'src/types/role';
import { useSnackbar } from 'src/components/snackbar';
import RoleTableToolbar from '../role-table-toolbar';
import RoleTableRow from '../role-table-row';
import RoleDialog from '../role-dialog';

const TABLE_HEAD = [
  { id: 'id', label: 'Role ID' },
  { id: 'name', label: 'Role Name' },
  { id: 'description', label: 'Description' },
  // { id: 'userCount', label: 'Users', align: 'center' },
  // { id: 'permissionCount', label: 'Permissions', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function RoleListView() {
  const dispatch = useAppDispatch();
  const { roles, loading, error } = useAppSelector((state) => state.role);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [currentRole, setCurrentRole] = useState<IRole | null>(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleCreateRole = async (data: any) => {
    try {
      await dispatch(createRole(data)).unwrap();
      setOpenDialog(false);
    } catch (err) {
      console.error('Failed to create role:', err);
    }
  };

  const handleDeleteRole = async (id: number) => {
    try {
      await dispatch(deleteRole(id)).unwrap();
      enqueueSnackbar('Role deleted successfully', { variant: 'success' });
    } catch (err) {
      console.error('Failed to delete role:', err);
      enqueueSnackbar('Failed to delete role', { variant: 'error' });
    }
  };

  const handleEditRole = async (data: any) => {
    try {
      await dispatch(updateRole({ id: currentRole!.id, data })).unwrap();
      enqueueSnackbar('Role updated successfully', { variant: 'success' });
      setOpenDialog(false);
      setCurrentRole(null);
    } catch (err) {
      console.error('Failed to update role:', err);
      enqueueSnackbar('Failed to update role', { variant: 'error' });
    }
  };

  const handleOpenEdit = (role: IRole) => {
    setCurrentRole(role);
    setOpenDialog(true);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(filterName.toLowerCase()) ||
      role.description?.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Role List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User Management', href: paths.dashboard.user.root },
          { name: 'Roles', href: paths.dashboard.user.role.list },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        sx={{ mb: 3 }}
        onClick={() => setOpenDialog(true)}
      >
        New Role
      </Button>

      <RoleDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setCurrentRole(null);
        }}
        onSubmit={currentRole ? handleEditRole : handleCreateRole}
        currentRole={currentRole}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <RoleTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={(event) => setFilterName(event.target.value)}
          />

          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={roles.length}
                numSelected={selected.length}
                onSort={(id) => {
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                  setOrderBy(id);
                }}
                onSelectAllRows={(checked) => {
                  if (checked) {
                    setSelected(roles.map((role) => role.id));
                  } else {
                    setSelected([]);
                  }
                }}
              />

              <TableBody>
                {filteredRoles.map((row) => (
                  <RoleTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => {}}
                    onDeleteRow={() => handleDeleteRole(row.id)}
                    onEditRow={() => handleOpenEdit(row)}
                  />
                ))}

                <TableNoData notFound={!filteredRoles.length} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={filteredRoles.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setPage(0);
            setRowsPerPage(Number(e.target.value));
          }}
        />
      </Card>
    </Container>
  );
}
