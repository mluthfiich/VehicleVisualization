import { useState, useEffect } from "react";
import Main from "../../../components/main/main";
import "./style.css";
import { Box, Typography, MenuItem, Select, Chip } from "@mui/material";
import axios from "axios";
import ButtonComponent from "../../../components/button/button";
import TableComponent from "../../../components/table/table";
import CardComponent from "../../../components/card/card";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "../../../components/modal/modal";
import AlertComponent from "../../../components/alert/alert";

const MenuPermission = () => {
  const [rows, setRows] = useState([]);
  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ role: "", menu: "" });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedFid, setSelectedFid] = useState(null);

  const columns = [
    { id: "number", label: "No", width: "5%" },
    { id: "menuName", label: "Menu Name", width: "10%" },
    { id: "roleName", label: "Role Name", width: "24%" },
    { id: "action", label: "Action", width: "10%" },
  ];

  useEffect(() => {
    fetchMenuList();
  }, []);

  const fetchMenuList = () => {
    const token = localStorage.getItem("Bearer ");

    axios
      .get("/api/Auth/ListRole", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles:", error));

    axios
      .get("/api/MenuPermission/ListMenu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMenus(response.data))
      .catch((error) => console.error("Error fetching menus:", error));

    axios
      .get("/api/MenuPermission/ListRoleMenu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const dataWithIds = response.data.map((row, index) => ({
          ...row,
          id: index,
          fid: row.fidMenuPermission,
        }));
        setRows(dataWithIds);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSubmitMenuPermission = () => {
    const token = localStorage.getItem("Bearer ");
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
      .then(() => {
        fetchMenuList();
        setOpenModal(false);
      })
      .catch((error) =>
        console.error(
          "Error adding menu permission:",
          error.response ? error.response.data : error.message
        )
      );
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
    sortData(property, isAscending ? "desc" : "asc");
  };

  const sortData = (property, order) => {
    const sortedRows = [...rows].sort((a, b) => {
      if (property === "number") {
        return order === "asc"
          ? a[property] - b[property]
          : b[property] - a[property];
      } else {
        const valA = a[property]?.toLowerCase() || "";
        const valB = b[property]?.toLowerCase() || "";
        if (valA < valB) return order === "asc" ? -1 : 1;
        if (valA > valB) return order === "asc" ? 1 : -1;
        return 0;
      }
    });
    setRows(sortedRows);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOpenConfirmDialog = (fid) => {
    setSelectedFid(fid);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedFid(null);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("Bearer ");
    axios
      .delete("/api/MenuPermission/DeleteMenuPermission", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          fid: selectedFid,
        },
      })
      .then(() => {
        setRows(rows.filter((row) => row.fid !== selectedFid));
        handleCloseConfirmDialog();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        handleCloseConfirmDialog();
      });
  };

  const getColorFromText = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
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
            rows={rows.map((row) => ({
              ...row,
              menuName: (
                <Chip
                  label={row.menuName}
                  sx={{
                    backgroundColor: getColorFromText(row.menuName),
                    color: "#fff",
                  }}
                />
              ),
              roleName: (
                <Chip
                  label={row.roleName}
                  sx={{
                    backgroundColor: getColorFromText(row.roleName),
                    color: "#fff",
                  }}
                />
              ),
              action: (
                <Box>
                  <ButtonComponent
                    mainColor="#e53935"
                    backColor="#ef5350"
                    onClick={() => handleOpenConfirmDialog(row.fid)}
                  >
                    <DeleteIcon />
                    Delete
                  </ButtonComponent>
                </Box>
              ),
            }))}
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
            <ButtonComponent
              mainColor="#2563eb"
              backColor="#0061FF"
              onClick={handleSubmitMenuPermission}
            >
              Submit
            </ButtonComponent>
          </Box>
        }
      />
      <AlertComponent
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
        buttonComponent={
          <Box display="flex" justifyContent="flex-end" width="100%">
            <ButtonComponent
              mainColor="#616161"
              backColor="#757575"
              onClick={handleCloseConfirmDialog}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              marginLeft="16px"
              mainColor="#e53935"
              backColor="#ef5350"
              onClick={handleConfirmDelete}
            >
              Delete
            </ButtonComponent>
          </Box>
        }
      />
    </Main>
  );
};

export default MenuPermission;