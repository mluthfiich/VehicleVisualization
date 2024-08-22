import { useState } from "react";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
// import useInactivityTimeout from '../../services/useInactivityTimeout';

const drawerWidth = 240;

function Main({ children }) {
  // useInactivityTimeout(1 * 60 * 60 * 1000);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  
  const handleDrawerToggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggleDesktop = () => {
    setDesktopOpen(!desktopOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        handleDrawerToggleMobile={handleDrawerToggleMobile}
        handleDrawerToggleDesktop={handleDrawerToggleDesktop}
        drawerWidth={drawerWidth}
        desktopOpen={desktopOpen}
      />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: { xs: "none", sm: desktopOpen ? "block" : "none" },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggleMobile}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="persistent"
          open={desktopOpen}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              transition: "width 0.3s ease",
              overflowX: "hidden",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 0,
          m: 0,
          transition: "margin-left 0.3s, width 0.3s ease",
          marginLeft: { sm: 0 },
          backgroundColor: "#f7f9fc",
          height: "100%",
          width: { sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            p: 2
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Main;