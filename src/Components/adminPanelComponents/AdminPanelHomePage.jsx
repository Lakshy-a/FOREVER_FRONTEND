import React from "react";
import AdminPanelNavbar from "./adminPanelNavbar";
import AdminPanelSidebar from "./AdminPanelSidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import AddItems from "./AddItems";
import ListItems from "./ListItems";
import Orders from "./Orders";

const AdminPanelHomePage = () => {
  // Get the current location (URL)
  const location = useLocation();

  return (
    <>
      {/* Admin Panel Layout */}
      <AdminPanelNavbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-fit pl-4 xs:pl-12">
          <AdminPanelSidebar />
        </div>

        {/* Content area that renders the components */}
        <div className="w-3/4">
          {/* Conditionally render content based on URL */}
          {location.pathname === "/adminPanelHomePage/add" && <AddItems />}
          {location.pathname === "/adminPanelHomePage/list" && <ListItems />}
          {location.pathname === "/adminPanelHomePage/orders" && <Orders />}
        </div>
      </div>

      {/* Route definitions */}
      <Routes>
        {/* <Route path="/adminPanelHomePage" element={<AdminPanelHomePage />} /> */}
        <Route path="/adminPanelHomePage/add" element={<AddItems />} />
        <Route path="/adminPanelHomePage/list" element={<ListItems />} />
        <Route path="/adminPanelHomePage/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default AdminPanelHomePage;
