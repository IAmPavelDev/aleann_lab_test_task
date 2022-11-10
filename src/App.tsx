import React from "react";
import style from "./App.module.scss";
import JobsList from "./JobsList/JobsList";

function App() {
  console.log("App");

  return (
    <div className={style.App}>
      <JobsList />
    </div>
  );
}

export default App;
