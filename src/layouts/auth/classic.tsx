// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

const navigation = [
  {
    label: "Privacy Policy",
    path: "/",
  },
  {
    label: "Terms of Service",
    path: "/",
  },
  {
    label: "Terms of Service",
    path: "/",
  },
];

export default function AuthClassicLayout({ children }: Props) {
  const renderLogo = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
        mt: 2,
        ml: 2,
        zIndex: 9,
        position: "fixed",
        top: 2,
        left: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          zIndex: 9,
          color: "primary.main",
          fontWeight: "bolder",
          fontSize: "24px",
          LineHeight: "100%",
          LetterSpacing: "0%",
        }}
      >
        Beam
      </Typography>
    </Box>
  );
  const footer = (
    <Box
      sx={{
        zIndex: 9,
        p: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
        borderTop: "1px solid #d8d8d847",
        width: "100%",
        mb: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "primary.main",
      }}
    >
      ll rights reserved.
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {navigation.map((link) => (
          <Typography
            key={link.label}
            component="a"
            href={link.path}
            sx={{
              color: "primary.main",
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
  return (
    <Stack
      sx={{
        p: 0,
        m: 0,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {renderLogo}
      {children}
      {footer}
    </Stack>
  );
}
