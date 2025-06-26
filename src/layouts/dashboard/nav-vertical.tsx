"use client";

import { useEffect } from "react";
// @mui

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// components
import Scrollbar from "src/components/scrollbar";
import { usePathname } from "src/routes/hooks";
import { NavSectionVertical } from "src/components/nav-section";
//
import { NAV } from "../config-layout";
import { useNavData } from "./config-navigation";
import { NavToggleButton } from "../_common";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();
  const lgUp = useResponsive("up", "lg");

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        // background: 'linear-gradient(to bottom right, rgb(28, 28, 124), #0f0f26) ',
        background: "#D0D0D7",
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
        sx={{ mt: 3, ml: 4, mb: 1 }}
      >
        <Typography
          sx={{
            color: "primary.main",
          }}
          variant="h6"
        >
          Beam
        </Typography>
      </Stack>

      <NavSectionVertical
        data={navData}
        config={{
          // currentRole: user?.role || 'admin',
          currentRole: "admin",
        }}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
