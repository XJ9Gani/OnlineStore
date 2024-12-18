import React from "react";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <Header />
      )}
      <AppRouter />
    </>
  );
};

export default App;
