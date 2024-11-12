import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/admin/getAllUsers", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data); // Accessing the data from response
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return <div>Users</div>;
};

export default Users;
