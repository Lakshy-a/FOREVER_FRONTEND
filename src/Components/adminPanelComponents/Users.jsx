import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/getAllUsers`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data); // Accessing the data from response
        setAllUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="px-4 xs:pl-8 mt-8 mb-16">
      <div className="text-xl font-semibold">Users List</div>
      {/* Grid Layout */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 gap-4 xs:gap-16 xl:grid-cols-4 xl:gap-24">
        {allUsers.map((user, index) => (
          <div
            key={user._id}
            className="w-[220px] h-36 rounded-xl bg-white flex flex-col items-center pt-2 gap-1 shadow-lg border border-black relative"
          >
            <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center text-2xl font-semibold">
              {user.name[0].toUpperCase()}
            </div>
            <div className="text-lg font-medium">{user.name}</div>
            <div className="px-8 flex flex-col w-full items-center">
              <div className="flex items-center gap-2">
                <span>
                  <FaPhone className="text-sm" />
                </span>
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <MdEmail className="text-sm" />
                </span>
                <span>{user.email}</span>
              </div>
            </div>
            <div className="absolute right-4 cursor-pointer"><PiDotsThreeOutlineFill /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
