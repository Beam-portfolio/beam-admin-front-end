'use client';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

type Props = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  currentRole: string;
  setCurrentRole: (role: string) => void;
};

export default function UserTableToolbar({
  filterName,
  onFilterName,
  numSelected,
  currentRole,
  setCurrentRole,
}: Props) {
  const { roles = [] } = useAppSelector((state) => state.role);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent={'space-between'}
      direction="row"
      sx={{ px: 2.5, py: 2 }}
    >
      <Typography>System Users</Typography>
      <Stack direction={'row'} spacing={2} alignItems="center" sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Roles</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentRole}
            label="Products"
            onChange={(e) => {
              setCurrentRole(e.target.value);
            }}
            size="small"
            sx={{
              minWidth: 110,
            }}
          >
            <MenuItem value={'all'}>All Roles</MenuItem>
            {roles.length > 0 &&
              roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
