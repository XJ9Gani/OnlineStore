import React, { useEffect, useState } from "react";
import imageHolder from "../assets/defaultImageHolder.webp";
import { useSelector } from "react-redux";
const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState("");
  const { status, error } = useSelector((state) => state.user);
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setCurrentUser(JSON.parse(user));
  }, []);

  return (
    <section className="w-[90vw] h-[100vh] mx-auto border shadow-sm">
      <img
        className="w-[200px] h-[200px] border rounded-full object-cover"
        src={currentUser.img || imageHolder}
      />
      <h1 className="text-center text-2xl w-[200px]">{currentUser.username}</h1>
    </section>
  );
};

export default UserProfile;
