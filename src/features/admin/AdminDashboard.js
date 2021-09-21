import React from "react";
import AddminAddBook from "./AdminAddBook";
import AdminBorrowTable from "./AdminBorrowTable";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <h1>Admin Dashboard</h1>
      <AdminBorrowTable />
      <AddminAddBook />
    </React.Fragment>
  );
};

export default AdminDashboard;
