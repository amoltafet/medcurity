import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar';

function  LearningPage() {
  return (
    <>
    <MenuBar></MenuBar>
    <div className="home">
        <h1 className="text-center mt-5"> Learning Modules</h1>
        <Outlet />
    </div>
    </>
  );
}

export default  LearningPage;