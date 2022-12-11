import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, loadUsers } from "store/users";

const Customers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => getUsers(state));

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Customers</h1>
      {users.map((user) => (
        <li key={user._id}>{user.name}</li>
      ))}
    </div>
  );
};

export default Customers;
