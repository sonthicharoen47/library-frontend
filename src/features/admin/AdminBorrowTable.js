import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBorrow,
  updateBorrowStatus,
  updateAdminStatus,
} from "./adminsSlice";
import { alpha } from "@mui/material/styles";

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
  Tooltip,
  IconButton,
  Modal,
  Button,
  Snackbar,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const { numSelected, selected, token } = props;

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

      {numSelected > 0 ? (
        <Box sx={{ display: "flex" }}>
          <DoneButtonModal borrowId={selected} token={token} />

          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : null}
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const DoneButtonModal = (props) => {
  const { borrowId, token } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  let body = {
    borrowListId: borrowId,
    status: "borrowing",
  };

  const handleModalClick = () => {
    dispatch(updateBorrowStatus({ body, token }));
    dispatch(getAllBorrow({ token }));
    handleModalClose();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleModalOpen}>
        <DoneIcon />
      </IconButton>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 id="update-modal-title">Text in a child modal</h2>
          <p id="update-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleModalClick}>Confirm</Button>
          <Button onClick={handleModalClose}>Close</Button>
        </Box>
      </Modal>
      {/* <Snackbar
        open={snackItems.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          serverity={snackItems.serverity}
          sx={{ width: "100%" }}
        >
          {snackItems.text}!
        </Alert>
      </Snackbar> */}
    </React.Fragment>
  );
};

const AdminBorrowTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { status, message, err, borrowList } = useSelector(
    (state) => state.admins
  );
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("start_date");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBorrow({ token }));
  }, []);

  useEffect(() => {
    if (borrowList !== []) {
      setTableData(borrowList);
    }
  }, [borrowList]);

  useEffect(() => {
    if (status === "success" && message !== "") {
      setOpen(true);
      setSelected([]);
    } else {
      dispatch(updateAdminStatus("idle"));
    }
  }, [status, message, err]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleUpdatetatus = (id, statusUpdate) => {
    let body = {
      borrowListId: id,
      status: statusUpdate,
    };
    dispatch(updateBorrowStatus({ body, token }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            serverity={open === true ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {open === true ? message : err}
          </Alert>
        </Snackbar>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          token={token}
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
                        {/* <Box>
                          <IconButton onClick={handleUpOpen}>
                            <DoneIcon />
                          </IconButton>
                          <Modal open={upOpen} onClose={handleUpOpenClose}>
                            <Box sx={{ ...modalStyle, width: 400 }}>
                              <Typography>Are u sure?</Typography>
                              <Button>Confirm</Button>
                            </Box>
                          </Modal>
                        </Box> */}
                        <DoneButtonModal
                          borrowId={row.id_borrow}
                          token={token}
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
  );
};

export default AdminBorrowTable;
