import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PatientDashboard from "../pages/PatientDashboard";

export function Root() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/patients" element={<PatientDashboard />} />
      </Routes>
    </div>
  );
}
