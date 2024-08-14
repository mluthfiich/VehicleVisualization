import { useState, useEffect } from "react";
import Main from "../../components/main/main";
import "./style.css";
import {
  Box,
  CardContent,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const DataVehicle = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("year");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const columns = [
    { id: "year", label: "Year" },
    { id: "province", label: "Province" },
    { id: "bus", label: "Car" },
    { id: "motorCycle", label: "Motor Cycle" },
    { id: "truck", label: "Truck" },
    { id: "totalUnit", label: "Total Unit" },
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Main>
      <Box>
        <Card sx={{ maxWidth: "100%" }}>
          <CardContent>
            <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} sx={{ color: "white", backgroundColor: "#3b82f6" }}>
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleRequestSort(column.id)}
                          sx={{
                            color: orderBy === column.id ? "white" : "inherit",
                            "&.Mui-active": {
                              color: "white",
                            },
                            "& .MuiTableSortLabel-icon": {
                              color: "white !important",
                            },
                            fontWeight: 'bold'
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </Main>
  );
};

export default DataVehicle;