'use client';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { RoleType } from 'src/types/role';

type Props = {
  value: RoleType;
  onChange: (newValue: RoleType) => void;
};

export default function RoleSelect({ value, onChange }: Props) {
  return (
    <TextField
      select
      fullWidth
      value={value}
      onChange={(event) => onChange(event.target.value as RoleType)}
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="manager">Manager</MenuItem>
      <MenuItem value="user">User</MenuItem>
    </TextField>
  );
}
