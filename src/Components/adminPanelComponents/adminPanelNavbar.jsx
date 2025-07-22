import React from "react";
import logo from "../../assets/admin_assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const adminPanelNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken"); // or however you're storing it

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/adminLogout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 👈 add this line
        },
      }
    );

    if (response.data.message === "Admin Logout Successful")
      localStorage.removeItem("accessToken");
    navigate("/adminPanelLogin");
  };

  return (
    <>
      <div className="px-4 xs:px-16 flex justify-between items-center py-3 border-b border-black">
        <div>
          <img src={logo} className="w-20 xs:w-28" />
        </div>
        <div>
          <button
            className="px-4 xs:px-6 py-1 xs:py-2 rounded-full bg-gray-600 text-white hover:bg-white hover:text-gray-600 hover:border border-gray-600 "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default adminPanelNavbar;
