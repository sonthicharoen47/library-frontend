import React from "react";
import AddminAddBook from "./AdminAddBook";
import AdminBorrowTable from "./AdminBorrowTable";
import AdminTest from "./AdminTest";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* <AddminAddBook /> */}
      <AdminBorrowTable />
      {/* <AdminTest /> */}
    </div>
  );
};

export default AdminDashboard;
