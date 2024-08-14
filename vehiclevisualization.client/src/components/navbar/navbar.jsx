import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const settings = ["Logout"];

const Navbar = ({
  handleDrawerToggleMobile,
  handleDrawerToggleDesktop,
  drawerWidth,
  desktopOpen,
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer ");
    navigate("/login");
  };

  const pathname = window.location.pathname;
  const titleMenu = pathname === "/" ? "Home" : pathname.split("/").pop();

  return (
    <AppBar
      className="navbar"
      position="fixed"
      sx={{
        width: { sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
        ml: { sm: desktopOpen ? `${drawerWidth}px` : 0 },
        backgroundColor: "rgba(255, 255, 255, 1)",
        color: "black",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggleDesktop}
          sx={{ mt:0.5, mr: 2, display: { sm: "block", xs: "none" } }}
        >
          {desktopOpen ? <MenuIcon /> : <ClearIcon />}
        </IconButton>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggleMobile}
          sx={{ mr: 2, display: { sm: "none", xs: "block" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "600", color: "#595959" }}
        >
          {titleMenu}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ ml: "auto" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountCircleIcon
                  alt="User"
                  sx={{
                    fontSize: 32,
                    color: "black",
                  }}
                />
                <Typography
                  sx={{
                    ml: 1.2,
                    fontSize: 17,
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  User
                  <ExpandMoreIcon sx={{ fontSize: 13, ml: 1.2 }} />
                </Typography>
              </Box>
            </IconButton>
          </Tooltip>
          <Menu
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 4.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -1,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 20,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleLogout}>
                <Logout sx={{ mr: 1.5 }} fontSize="small" />
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;