import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import Iconify from '../iconify';
import * as Yup from 'yup';
import axiosInstance from '@/utils/axios';
import { useAuthContext } from '@/auth/hooks';
import { toast } from 'react-toastify';

const addressSchema = Yup.object().shape({
  label: Yup.string().required('label is required'),
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  isDefault: Yup.boolean(),
  phone: Yup.string().min(10).required('Phone is required'),
});

export const AddAddressDialog = ({
  open,
  onClose,
  currentAddress,
}: {
  open: boolean;
  onClose: () => void;
  currentAddress: any;
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [address, setAddress] = useState<{
    label: string;
    name: string;
    address: string;
    city: string;
    country: string;
    isDefault: boolean;
    phone: string;
  }>(
    currentAddress
      ? currentAddress
      : {
          label: '',
          name: '',
          address: '',
          city: '',
          country: 'United States',
          isDefault: false,
          phone: '',
        }
  );

  const { user } = useAuthContext();

  const handleAddressChange = (field: string, value: string | boolean) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const validateAddress = async () => {
    try {
      await addressSchema.validate(address, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const errorsObj = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((issue) => {
          errorsObj[issue.path] = issue.message;
        });
      } else {
        console.error(error);
      }
      setErrors(errorsObj);
    }
  };

  const handleSubmit = async () => {
    await validateAddress();
    if (Object.keys(errors).length > 0) return;
    const shippingAddresses = user?.settings?.shipping_Address || [];

    if (address.isDefault) {
      // Unset isDefault for all other addresses
      for (const addr of shippingAddresses) {
        addr.isDefault = false;
      }
    }

    if (currentAddress) {
      try {
        const filterAds = shippingAddresses.filter(
          (addr: any) => addr.address !== currentAddress.address
        );
        const updatedAddresses = address.isDefault
          ? [...filterAds.map((addr) => ({ ...addr, isDefault: false })), address]
          : [...filterAds, address];

        const response = await axiosInstance.patch(`/v1/sellers/${user?.settings?.id}`, {
          ...user?.settings,
          shipping_Address: updatedAddresses,
        });
        onClose();
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      try {
        const updatedAddresses = address.isDefault
          ? [...shippingAddresses.map((addr) => ({ ...addr, isDefault: false })), address]
          : [...shippingAddresses, address];
        const response = await axiosInstance.patch(`/v1/sellers/${user?.settings?.id}`, {
          ...user?.settings,
          shipping_Address: updatedAddresses,
        });
        onClose();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (currentAddress) {
      setAddress(currentAddress);
    }
  }, [currentAddress]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Address
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
          <Iconify icon="material-symbols:close" width="24" height="24" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Label"
              name="label"
              placeholder="e.g., Home, Office"
              error={!!errors.label}
              helperText={errors.label}
              onChange={(e) => handleAddressChange('label', e.target.value)}
              value={address.label}
            />
            <TextField
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => handleAddressChange('name', e.target.value)}
              value={address.name}
              fullWidth
              label="Name"
              name="name"
              placeholder="e.g., John Doe"
            />
          </Stack>

          <TextField
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => handleAddressChange('address', e.target.value)}
            value={address.address}
            fullWidth
            label="Address"
            name="address"
            placeholder="Enter address : 123 Main Street, Apt 4B"
          />
          <Stack direction="row" spacing={2}>
            <TextField
              error={!!errors.city}
              helperText={errors.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              value={address.city}
              fullWidth
              label="City"
              name="city"
              placeholder="Enter city"
            />
          </Stack>

          <TextField
            select
            fullWidth
            label="country"
            value={address.country}
            error={!!errors.country}
            helperText={errors.country}
            onChange={(e) => handleAddressChange('country', e.target.value)}
          >
            <MenuItem value="United States">United States</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
          </TextField>

          <TextField
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={(e) => handleAddressChange('phone', e.target.value)}
            value={address.phone}
            fullWidth
            label="Phone Number"
            name="phone"
            placeholder="Enter phone number"
            type="number"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Set as default shipping address"
            name="isDefault"
            onChange={(e) => handleAddressChange('isDefault', e.target.checked)}
            value={address.isDefault}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#e11d48' }}>
          Save Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};
