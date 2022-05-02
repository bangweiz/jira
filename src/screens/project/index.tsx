import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { DashboardScreen } from "../dashboard";
import { Epic } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="dashboard">Dashboard</Link>
      <Link to="epic">Epic</Link>
      <Routes>
        <Route path="dashboard" element={<DashboardScreen />} />
        <Route path="epic" element={<Epic />} />
        <Route
          path=""
          element={
            <Navigate
              to={window.location.pathname + "/dashboard"}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
