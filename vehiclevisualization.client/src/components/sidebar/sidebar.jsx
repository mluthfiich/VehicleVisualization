import { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("Bearer ");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("/api/MenuPermission/Permission", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const data = response.data;
        const processedData = processMenuData(data);
        setMenuItems(processedData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname.slice(1);
    const findMenuAndSubMenu = (menus, path) => {
      let foundMenu = null;
      menus.forEach((menu) => {
        if (menu.actionName === path) {
          foundMenu = menu;
        } else if (Array.isArray(menu.subMenu) && menu.subMenu.length > 0) {
          const found = findMenuAndSubMenu(menu.subMenu, path);
          if (found) {
            foundMenu = found;
            setOpenMenus((prevState) => ({
              ...prevState,
              [menu.name]: true,
            }));
          }
        }
      });
      return foundMenu;
    };

    const selected = findMenuAndSubMenu(menuItems, currentPath);
    if (selected) {
      setSelectedMenu(selected.name);
      setSelectedSubMenu(currentPath);
    }
  }, [menuItems]);

  const processMenuData = (data) => {
    const menuMap = {};

    data.forEach((item) => {
      if (!item.parentMenuId) {
        menuMap[item.id] = { ...item, subMenu: [] };
      } else {
        if (menuMap[item.parentMenuId]) {
          menuMap[item.parentMenuId].subMenu =
            menuMap[item.parentMenuId].subMenu || [];
          menuMap[item.parentMenuId].subMenu.push(item);
        }
      }
    });

    return Object.values(menuMap);
  };

  const handleClick = (menuName, actionName) => {
    if (actionName) {
      const cleanedActionName = actionName.startsWith("/")
        ? actionName.slice(1)
        : actionName;
      navigate(`/${cleanedActionName}`);
      setSelectedMenu(menuName);
      setSelectedSubMenu(cleanedActionName);
    } else {
      setOpenMenus((prevState) => ({
        ...prevState,
        [menuName]: !prevState[menuName],
      }));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          mb: 0.5,
          textAlign: "center",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#3b82f6",
            cursor: "pointer",
          }}
          onClick={() => navigate("/Home")}
        >
          VOIVI
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((menu) => (
          <Box key={menu.id}>
            <ListItem
              button
              onClick={() => handleClick(menu.name, menu.actionName)}
              sx={{
                backgroundColor:
                  selectedMenu === menu.name ? "#e3f2fd" : "inherit",
              }}
            >
              <ListItemText
                primary={menu.name}
                primaryTypographyProps={{
                  fontSize: "19px",
                  fontWeight: "medium",
                  color: selectedMenu === menu.name ? "#3b82f6" : "inherit",
                }}
              />
              {openMenus[menu.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {Array.isArray(menu.subMenu) && menu.subMenu.length > 0 && (
              <Collapse in={openMenus[menu.name]} unmountOnExit>
                {menu.subMenu.map((subMenu) => (
                  <ListItem
                    key={subMenu.id}
                    onClick={() =>
                      handleClick(subMenu.name, subMenu.actionName)
                    }
                    sx={{ backgroundColor: selectedSubMenu === subMenu.actionName ? "rgba(29, 32, 37, 0.06)" : "inherit", cursor: "pointer"}}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "16px",
                        ml: 2,
                        color:
                          selectedSubMenu === subMenu.actionName
                            ? "blue"
                            : "inherit",
                      }}
                      primary={subMenu.name}
                    />
                  </ListItem>
                ))}
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;