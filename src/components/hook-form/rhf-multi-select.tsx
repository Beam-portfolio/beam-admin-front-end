'use client';

import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  SelectProps,
  FormControl,
  InputLabel,
} from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface Props extends Omit<SelectProps, 'value'> {
  name: string;
  label?: string;
  options: Option[];
  checkbox?: boolean;
  placeholder?: string;
  loading?: boolean;
}

export default function RHFMultiSelect({
  name,
  label,
  options,
  checkbox,
  placeholder,
  loading,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
          <Select
            {...field}
            multiple
            labelId={`${name}-label`}
            label={label}
            placeholder={placeholder}
            error={!!error}
            renderValue={(value: unknown) => {
              const selected = value as string[];
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((valuee) => (
                    <Chip
                      key={valuee}
                      label={options.find((option) => option.value === valuee)?.label}
                    />
                  ))}
                </Box>
              );
            }}
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {checkbox && <Checkbox checked={field.value?.indexOf(option.value) > -1} />}
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
