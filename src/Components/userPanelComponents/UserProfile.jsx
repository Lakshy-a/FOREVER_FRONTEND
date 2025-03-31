import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Initialize with null

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth/userProfile`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data)
        setUserData(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="custom-padding mt-8 w-full h-96 flex flex-col gap-2 xs:gap-4">
      <div className="w-full xs:w-full h-60 flex items-center justify-center">
        <div className="w-16 h-16 xs:w-20 xs:h-20 box-border p-16 xs:p-20 flex justify-center items-center bg-black rounded-full text-7xl text-white uppercase">
          {userData && userData.name ? userData.name[0] : "U"}
        </div>
      </div>
      <div className="w-full xs:w-full h-fit text-center flex items-start xs:items-start  justify-center text-3xl xs:text-5xl">
        {userData ? `Welcome, ${userData.name}` : "Loading..."}
      </div>
      <div className="w-full flex flex-col items-start">
        <div>Your Contact Details</div>
       <div> Phone- {userData.phone}, Email- {userData.email} </div>
      </div>
    </div>
  );
};

export default UserProfile;
