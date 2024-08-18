import { useState, useEffect } from "react";
import Main from "../../../components/main/main";
import "./style.css";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import TableComponent from "../../../components/table/table";
import ButtonComponent from "../../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import CardComponent from "../../../components/card/card";
import ModalComponent from "../../../components/modal/modal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModalAccount, setOpenModalAccount] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalRole, setOpenModalRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState({
    passwordError: false,
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  const columns = [
    { id: "number", label: "No", width: "5%" },
    { id: "userName", label: "Username", width: "10%" },
    { id: "roleName", label: "Role Name", width: "10%" },
    { id: "email", label: "Email", width: "10%" },
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
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    const token = localStorage.getItem("Bearer ");

    axios
      .get("/api/Auth/ListUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

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
      .get("/api/Auth/ListUserRole", {
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

  const handleOpenModalAccount = () => {
    setOpenModalAccount(true);
  };

  const handleCloseModalAccount = () => {
    setOpenModalAccount(false);
  };

  const handleOpenModalUser = () => {
    setOpenModalUser(true);
  };

  const handleCloseModalUser = () => {
    setOpenModalUser(false);
  };

  const handleOpenModalRole = () => {
    setOpenModalRole(true);
  };

  const handleCloseModalRole = () => {
    setOpenModalRole(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitUser = () => {
    const token = localStorage.getItem("Bearer ");
    axios
      .post(
        "/api/Auth/Register",
        {
          username: formData.userName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOpenModalUser(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleSubmitRole = () => {
    const token = localStorage.getItem("Bearer ");
    axios
      .post(
        "/api/Auth/AddRole",
        { role: formData.role },
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

  const handleSubmitAccount = () => {
    const token = localStorage.getItem("Bearer ");

    axios
      .post(
        "/api/Auth/AssignRole",
        {
          userName: formData.userName,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOpenModalAccount(false);
        fetchUserList();
      })
      .catch((error) => {
        console.error("Error assigning role:", error);
      });
  };

  return (
    <Main>
      <Box>
        <CardComponent>
          <ButtonComponent
            mainColor="#3b82f6"
            backColor="#0061FF"
            onClick={handleOpenModalAccount}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            Add Account
          </ButtonComponent>
          <ButtonComponent
            mainColor="#ffa000"
            backColor="#ff6f00"
            marginLeft="16px"
            onClick={handleOpenModalUser}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            Add User
          </ButtonComponent>
          <ButtonComponent
            mainColor="limegreen"
            backColor="#23f724"
            marginLeft="16px"
            onClick={handleOpenModalRole}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            Add Role
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
        open={openModalUser}
        handleClose={handleCloseModalUser}
        title="Add User"
        body={
          <Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              key="userName"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Username</Typography>
              <TextField
                name="userName"
                label="Username"
                variant="outlined"
                value={formData.userName}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              />
            </Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              key="email"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Email</Typography>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              />
            </Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Password</Typography>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={error.passwordError}
              />
            </Box>
          </Box>
        }
        footer={
          <Box textAlign="right">
            <ButtonComponent
              mainColor="#2563eb"
              backColor="#0061FF"
              onClick={handleSubmitUser}
            >
              Submit
            </ButtonComponent>
          </Box>
        }
      />
      <ModalComponent
        open={openModalAccount}
        handleClose={handleCloseModalAccount}
        title="Add Account"
        body={
          <Box>
            <Box
              p="0px 50px 0px 30px"
              display="flex"
              marginBottom="16px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Username</Typography>
              <Select
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              >
                {users.map((user) => (
                  <MenuItem key={user.userId} value={user.userName}>
                    {user.userName}
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
              <Typography>Role</Typography>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                sx={{ width: "75%" }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleName}>
                    {role.roleName}
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
              onClick={handleSubmitAccount}
            >
              Submit
            </ButtonComponent>
          </Box>
        }
      />
      <ModalComponent
        open={openModalRole}
        handleClose={handleCloseModalRole}
        title="Add Role"
        body={
          <Box>
            {["role"].map((field) => (
              <Box
                p="0px 50px 0px 30px"
                display="flex"
                key={field}
                marginBottom="16px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Typography>
                <TextField
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  value={formData[field]}
                  onChange={handleInputChange}
                  sx={{ width: "75%" }}
                />
              </Box>
            ))}
          </Box>
        }
        footer={
          <Box textAlign="right">
            <ButtonComponent
              mainColor="#2563eb"
              backColor="#0061FF"
              onClick={handleSubmitRole}
            >
              Submit
            </ButtonComponent>
          </Box>
        }
      />
    </Main>
  );
};

export default UserManagement;
