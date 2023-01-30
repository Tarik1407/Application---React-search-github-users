import React, { useContext } from "react";
import Info from "../components/Info";
import Repos from "../components/Repos";
import User from "../components/User";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import loadingImage from "../images/preloader.gif";
import { AppContext } from "../context/context";
const Dashboard = () => {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="name" />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
