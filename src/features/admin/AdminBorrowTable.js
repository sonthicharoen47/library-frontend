import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateBorrowStatus, deletedBorrow, getAllBorrow } from "./adminsSlice";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

import {
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Box,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const columns = [
  {
    id: "id_borrow",
    label: "ID",
  },
  {
    id: "Role.Account.fname",
    label: "First Name",
  },
  {
    id: "start_date",
    label: "S Date",
  },
  {
    id: "end_date",
    label: "E Date",
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onChange={onSelectAllClick}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{
              "aria-label": "select all id",
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, token, onRequestFilter } = props;
  const [statusFilter, setStatusFilter] = useState("ordering");

  const handleChanged = (e) => {
    setStatusFilter(e.target.value);
    onRequestFilter(e, e.target.value);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={8}>
          <Box sx={{ justifyContent: "flex-start" }}>
            {numSelected > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                {numSelected} selected
              </Typography>
            ) : (
              <Typography>BorrowTable</Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            {numSelected > 0 ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4 }}>
                <ButtonModal
                  borrowId={selected}
                  token={token}
                  statusFilter={statusFilter}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4 }}>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      value={statusFilter}
                      label="Status"
                      onChange={handleChanged}
                    >
                      <MenuItem value="ordering">Ordering</MenuItem>
                      <MenuItem value="borrowing">Borrowing</MenuItem>
                      <MenuItem value="return">Return</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ButtonModal = (props) => {
  const { borrowId, token, statusFilter } = props;
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    let body = {
      borrowListId: borrowId,
      status: statusFilter,
    };
    dispatch(deletedBorrow({ body, token })).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
      }
      if (result.payload.err) {
        text = result.payload.err;
        severity = "error";
      }
      dispatch(postSnackbarAlert({ text, severity }));
      dispatch(getAllBorrow({ token }));
    });
    handleDeleteClose();
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleUpdateClick = async () => {
    let body = {
      borrowListId: borrowId,
      status: statusFilter,
    };
    await dispatch(updateBorrowStatus({ body, token })).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
      }
      if (result.payload.err) {
        text = result.payload.err;
        severity = "error";
      }
      dispatch(postSnackbarAlert({ text, severity }));
    });
    await dispatch(getAllBorrow({ token }));
    handleUpdateClose();
  };

  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  return (
    <React.Fragment>
      {statusFilter === "return" ? null : (
        <IconButton onClick={handleUpdateOpen}>
          <DoneIcon />
        </IconButton>
      )}

      <IconButton onClick={handleDeleteOpen}>
        <DeleteIcon />
      </IconButton>
      <Modal
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 id="update-modal-title">Alert!</h2>
          <p id="update-modal-description">
            You want to changed borrow status?
          </p>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleUpdateClick}
              sx={{
                bgcolor: "success.main",
                color: "white",
                mt: 1,
                width: "30%",
                mx: 1,
              }}
            >
              Confirm
            </Button>
            <Button onClick={handleUpdateClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            width: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 id="delete-modal-title">Alert!</h2>
          <p id="delete-modal-description">You want to deleted this borrow?</p>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleDeleteClick}
              sx={{
                bgcolor: "error.main",
                color: "white",
                mt: 1,
                width: "30%",
                mx: 1,
              }}
            >
              Confirm
            </Button>
            <Button onClick={handleDeleteClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const AdminBorrowTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { borrowList } = useSelector((state) => state.admins);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("start_date");
  const [statusFilter, setStatusFilter] = useState("ordering");

  useEffect(() => {
    dispatch(getAllBorrow({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setTableData(borrowList.filter((items) => items.status === statusFilter));
    setSelected([]);
  }, [statusFilter, borrowList]);

  const handleChangePage = (e, newValue) => {
    setPage(newValue);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = tableData.map((element) => element.id_borrow);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRequestFilter = (e, property) => {
    if (!property) {
      setStatusFilter("ordering");
    }
    setStatusFilter(property);
  };

  return (
    <React.Fragment>
      <Typography
        variant="h2"
        sx={{
          fontStyle: "italic",
          fontFamily: "fantasy",
          letterSpacing: 3,
          color: "#fb8c00",
          fontWeight: "medium",
          mt: 2,
          flexGrow: 1,
          mx: 10,
        }}
      >
        Admin Table
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 1,
        }}
      >
        <Paper sx={{ width: "80%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={selected}
            token={token}
            onRequestFilter={handleRequestFilter}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tableData.length}
              />
              <TableBody>
                {tableData
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id_borrow);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        key={row.id_borrow}
                        hover
                        onClick={(e) => handleClick(e, row.id_borrow)}
                        selected={isItemSelected}
                        role="checkbox"
                        tabIndex={-1}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          id={labelId}
                        >
                          {row.id_borrow}
                        </TableCell>
                        <TableCell align="right">
                          {row.Role.Account.fname}
                        </TableCell>
                        <TableCell align="right">
                          {row.start_date.slice(0, 10)}
                        </TableCell>
                        <TableCell align="right">
                          {row.end_date.slice(0, 10)}
                        </TableCell>
                        <TableCell align="right">
                          <ButtonModal
                            borrowId={row.id_borrow}
                            token={token}
                            statusFilter={statusFilter}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default AdminBorrowTable;
