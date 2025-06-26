import React, { useState, KeyboardEvent } from 'react';
import { Box, TextField, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface MultiValueInputProps {
  values: string[];
  onChange: (newValues: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const MultiValueInput = ({
  values,
  onChange,
  label = 'Add items',
  placeholder = 'Type and press Enter'
}: MultiValueInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      if (!values.includes(inputValue.trim())) {
        onChange([...values, inputValue.trim()]);
      }
      setInputValue('');
    }
    
    if (event.key === 'Backspace' && !inputValue && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const handleDelete = (itemToDelete: string) => {
    onChange(values.filter((item) => item !== itemToDelete));
  };



  const defaultSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
      },
    },
  };

  const defaultInputLabelSx = {
    color: 'rgba(108, 108, 179, 0.5)',
    '&.Mui-focused': {
      color: 'rgba(108, 108, 179, 0.5)',
    },
  };

  const defaultInputSx = {
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: '#D0D0D7 !important',
    borderRadius: 1,
  };

  return (
    <Box>
      <TextField
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        label={label}
        placeholder={placeholder}
        sx={{
          ...defaultSx,
        }}
        InputLabelProps={{
          sx: {
            ...defaultInputLabelSx,
          },
        }}
        inputProps={{
          sx: {
            ...defaultInputSx,
          },
        }}
      />
      
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {values.map((item) => (
          <Chip
            key={item}
            label={item}
            onDelete={() => handleDelete(item)}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};