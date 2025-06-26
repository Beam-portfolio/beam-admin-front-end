import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();
  const theme = useTheme();

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
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              const val = event.target.value;
              field.onChange(val === '' ? undefined : Number(val));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          sx={{
            ...defaultSx,
            ...(other.sx || {}),
          }}
          InputLabelProps={{
            sx: {
              ...defaultInputLabelSx,
              ...(other.InputLabelProps?.sx || {}),
            },
            ...other.InputLabelProps,
          }}
          inputProps={{
            sx: {
              ...defaultInputSx,
              ...(other.inputProps?.sx || {}),
            },
            ...other.inputProps,
          }}
          {...other}
        />
      )}
    />
  );
}