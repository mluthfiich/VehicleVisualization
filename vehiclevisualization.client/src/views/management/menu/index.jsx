import { useState, useEffect } from "react";
import Main from "../../../components/main/main";
import "./style.css";
import { Box, Typography, MenuItem, Select } from "@mui/material";
import axios from "axios";
import ButtonComponent from "../../../components/button/button";
import TableComponent from "../../../components/table/table";
import CardComponent from "../../../components/card/card";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/modal/modal";
import DeleteIcon from "@mui/icons-material/Delete";

const MenuManagement = () => {
  const [rows, setRows] = useState([]);
  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    menu: "",
  });

  const columns = [
    { id: "number", label: "No", width: "5%" },
    { id: "menuName", label: "Menu Name", width: "10%" },
    { id: "roleName", label: "Role Name", width: "24%" },
    {
      id: "action",
      label: "Action",
      width: "10%",
      render: (row) => (
        <ButtonComponent mainColor="#e53935" backColor="#ef5350">
          <DeleteIcon sx={{ mr: 0.5 }} />
          Delete
        </ButtonComponent>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("Bearer ");

    axios
      .get("/api/Auth/ListRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });

    axios
      .get("/api/MenuPermission/ListMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });

    axios
      .get("/api/MenuPermission/ListRoleMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const dataWithIds = response.data.map((row, index) => ({
          ...row,
          id: index,
        }));
        setRows(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmitMenuPermission = () => {
    const token = localStorage.getItem("Bearer ");
    console.log(formData.role, formData.menu)
    axios
      .post(
        "/api/MenuPermission/AddMenuPermission",
        { roleId: formData.role, menuId: formData.menu },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOpenModalRole(false);
      })
      .catch((error) => {
        console.error(
          "Error adding role:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Main>
      <Box>
        <CardComponent>
          <ButtonComponent
            mainColor="#3b82f6"
            backColor="#0061FF"
            onClick={handleOpenModal}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            Add Menu
          </ButtonComponent>

          <TableComponent
            columns={columns}
            rows={rows}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            mTop="16px"
          />
        </CardComponent>
      </Box>
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="Add Menu"
        body={
          <Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Role</Typography>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Menu</Typography>
              <Select
                name="menu"
                value={formData.menu}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              >
                {menus.map((menu) => (
                  <MenuItem key={menu.fid} value={menu.fid}>
                    {menu.menuName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        }
        footer={
          <Box textAlign="right">
            <ButtonComponent mainColor="#2563eb" backColor="#0061FF" onClick={handleSubmitMenuPermission}>
              Submit
            </ButtonComponent>
          </Box>
        }
      />
    </Main>
  );
};

export default MenuManagement;