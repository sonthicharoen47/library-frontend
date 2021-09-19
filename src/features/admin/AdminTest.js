import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBorrow } from "./adminsSlice";

const AdminTest = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { borrowList } = useSelector((state) => state.admins);
  const [ordering, setOrdering] = useState([]);
  const [borrowing, setBorrowing] = useState([]);
  const [returning, setReturning] = useState([]);

  useEffect(() => {
    dispatch(getAllBorrow({ token })).then((result) => {
      setOrdering(
        result.payload.filter((items) => items.status === "ordering")
      );
      setBorrowing(
        result.payload.filter((items) => items.status === "borrowing")
      );
      setReturning(result.payload.filter((items) => items.status === "return"));
    });
  }, []);

  return <div></div>;
};

export default AdminTest;
