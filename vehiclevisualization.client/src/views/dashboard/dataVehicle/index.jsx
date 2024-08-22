import { useState, useEffect } from "react";
import Main from "../../../components/main/main";
import TableComponent from "../../../components/table/table";
import "./style.css";
import axios from "axios";
import { Box, IconButton, Paper, InputBase } from "@mui/material";
import CardComponent from "../../../components/card/card";
import SearchIcon from "@mui/icons-material/Search";

const DataVehicle = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchText, setSearchText] = useState("");

  const columns = [
    { id: "number", label: "No", width: "5%" },
    { id: "year", label: "Year", width: "10%" },
    { id: "province", label: "Province", width: "28%" },
    { id: "bus", label: "Bus", width: "10%" },
    { id: "car", label: "Car", width: "10%" },
    { id: "motorCycle", label: "Motor Cycle", width: "10%" },
    { id: "truck", label: "Truck", width: "10%" },
    { id: "totalUnit", label: "Total Unit", width: "15%" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("Bearer ");

    axios
      .get("/api/Vehicle/units", {
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
        setFilteredRows(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSearchText(value);

    if (value === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toUpperCase().includes(value)
        )
      );
      setFilteredRows(filtered);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Main>
      <Box>
        <CardComponent>
          <Box>
            <Paper
              component="form"
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                width: 400,
                height: 42,
                border: "solid 1px #c6c6c6",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 16, textTransform: "uppercase" }}
                placeholder="Search"
                inputProps={{ "aria-label": "Search" }}
                value={searchText}
                onChange={handleSearchChange}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <TableComponent
            columns={columns}
            rows={filteredRows}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardComponent>
      </Box>
    </Main>
  );
};

export default DataVehicle;