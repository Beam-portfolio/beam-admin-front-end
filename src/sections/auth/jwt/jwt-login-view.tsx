"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useSearchParams, useRouter } from "src/routes/hooks";
// config
import { PATH_AFTER_LOGIN } from "src/config-global";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// auth
// components
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { SubmitButton } from "src/components/auth-components";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuthContext } from "@/auth/hooks";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const theme = useTheme();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.",
      );
    }
  });

  // ----------------------------------------------------------------------

  const renderHead = (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid #D0D0D7`,
        gap: 3,
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          color: "#D0D0D7",
          fontWeight: 700,
          mb: 0.5,
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        Log In
      </Typography>
    </Box>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <RHFTextField
        name="email"
        placeholder="Email"
      />
      <RHFTextField
        name="password"
        placeholder="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                  color={"#D0D0D7"}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          sx={{ color: "#D0D0D7" }}
        />
        <Typography
          component={RouterLink}
          href={paths.auth.jwt.forgotPassword}
          variant="body2"
          color="inherit"
          // underline="none"
          sx={{ color: "#D0D0D7", textDecoration: "none" }}
        >
          Forgot password?
        </Typography>
      </Box>
      <SubmitButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: "#D0D0D7 !important",
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            color: "#fff",
            borderColor: "#D0D0D7",
          },
        }}
      >
        Sign In
      </SubmitButton>
    </Stack>
  );

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          py: 4,
          px: 3,
          boxShadow:
            "0px 10px 15px 0px rgba(0, 0, 0, 0.1), 0px 4px 6px 0px rgba(0, 0, 0, 0.1)",
          width: { md: "30dvw" },
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}
          {renderForm}
        </FormProvider>
      </Box>
    </Stack>
  );
}
