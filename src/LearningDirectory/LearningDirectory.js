import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar/MenuBar';

function  LearningDirectoryPage() {
  return (
    <>
    <MenuBar></MenuBar>
    <div className="home">
        

        <Outlet />
    </div>
    </>
  );
}

export default  LearningDirectoryPage;