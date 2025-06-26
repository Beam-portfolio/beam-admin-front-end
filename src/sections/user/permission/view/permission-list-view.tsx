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
import { TableNoData, TableHeadCustom } from 'src/components/table';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  fetchPermissions,
  deletePermission,
  createPermission,
  updatePermission,
} from 'src/redux/slices/permissionSlice';
import { useSnackbar } from 'src/components/snackbar';
import { IPermission } from 'src/types/permission';
import PermissionTableRow from '../permission-table-row';
import PermissionDialog from '../permission-dialog';
import PermissionTableToolbar from '../permission-table-toolbar';

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'key', label: 'Key' },
  { id: 'resource', label: 'Resource' },
  { id: 'action', label: 'Action' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function PermissionListView() {
  const dispatch = useAppDispatch();
  const { permissions, loading } = useAppSelector((state) => state.permission);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<IPermission | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [filterName, setFilterName] = useState('');

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(filterName.toLowerCase()) ||
      permission.key.toLowerCase().includes(filterName.toLowerCase()) ||
      permission.resource.toLowerCase().includes(filterName.toLowerCase()) ||
      permission.action.toLowerCase().includes(filterName.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleCreatePermission = async (data: any) => {
    try {
      await dispatch(createPermission(data)).unwrap();
      enqueueSnackbar('Permission created successfully', { variant: 'success' });
      setOpenDialog(false);
    } catch (err) {
      console.error('Failed to create permission:', err);
      enqueueSnackbar('Failed to create permission', { variant: 'error' });
    }
  };

  const handleEditPermission = async (data: any) => {
    try {
      await dispatch(updatePermission({ id: currentPermission!.id, data })).unwrap();
      enqueueSnackbar('Permission updated successfully', { variant: 'success' });
      setOpenDialog(false);
      setCurrentPermission(null);
    } catch (err) {
      console.error('Failed to update permission:', err);
      enqueueSnackbar('Failed to update permission', { variant: 'error' });
    }
  };

  const handleDeletePermission = async (id: number) => {
    try {
      await dispatch(deletePermission(id)).unwrap();
      enqueueSnackbar('Permission deleted successfully', { variant: 'success' });
    } catch (err) {
      console.error('Failed to delete permission:', err);
      enqueueSnackbar('Failed to delete permission', { variant: 'error' });
    }
  };

  const handleOpenEdit = (permission: IPermission) => {
    setCurrentPermission(permission);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Permission List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User Management', href: paths.dashboard.user.root },
          { name: 'Permissions', href: paths.dashboard.user.permission.list },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={() => setOpenDialog(true)}
      >
        New Permission
      </Button>

      <Card sx={{ mt: 3 }}>
        <TableContainer>
          <PermissionTableToolbar
            numSelected={0}
            filterName={filterName}
            onFilterName={(event) => setFilterName(event.target.value)}
          />
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 800 }}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                order="asc"
                orderBy="name"
                rowCount={filteredPermissions.length}
                numSelected={0}
                onSort={() => {}}
                onSelectAllRows={() => {}}
              />

              <TableBody>
                {filteredPermissions.map((row) => (
                  <PermissionTableRow
                    key={row.id}
                    row={row}
                    selected={false}
                    onSelectRow={() => {}}
                    onEditRow={() => handleOpenEdit(row)}
                    onDeleteRow={() => handleDeletePermission(row.id)}
                  />
                ))}

                <TableNoData notFound={!filteredPermissions.length} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>

      <PermissionDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setCurrentPermission(null);
        }}
        onSubmit={currentPermission ? handleEditPermission : handleCreatePermission}
        currentPermission={currentPermission}
      />
    </Container>
  );
}
