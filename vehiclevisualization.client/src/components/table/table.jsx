// TableComponent.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";

const TableComponent = ({
  columns,
  rows,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  mTop,
  mBottom,
}) => {
  const sortedRows = [...rows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatNumber = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <Box sx={{ mt: mTop, mb: mBottom }}>
      <TableContainer component={Paper} sx={{ maxHeight: "74vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    color: "white",
                    backgroundColor: "#3b82f6",
                    width: column.width,
                    fontWeight: "bold",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => onRequestSort(column.id)}
                    sx={{
                      color: orderBy === column.id ? "white" : "inherit",
                      "&.Mui-active": {
                        color: "white",
                      },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{ width: columns[0].width }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                {columns.slice(1).map((column) => (
                  <TableCell key={column.id} sx={{ width: column.width }}>
                    {column.render
                      ? column.render(row)
                      : typeof row[column.id] === "number"
                      ? formatNumber(row[column.id])
                      : row[column.id]}
                  </TableCell>
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};

export default TableComponent;