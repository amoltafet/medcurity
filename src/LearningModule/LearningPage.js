import { React } from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar';
import './LearningPage.css';

function  LearningPage() {
  return (
    <>
    <MenuBar></MenuBar>
    <div>
        <Outlet />
    </div>
    </>
  );
}

export default  LearningPage;