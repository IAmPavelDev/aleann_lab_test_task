import React from "react";
import { Route, Routes } from "react-router-dom";
import style from "./App.module.scss";
import JobDetails from "./JobDetails";
import JobsList from "./JobsList/JobsList";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route
          path="/"
          element={
            <JobsList/>
          }
        />
        <Route
          path="/job/:jobId"
          element={<JobDetails/>}
        />
      </Routes>
    </div>
  );
}

export default App;
