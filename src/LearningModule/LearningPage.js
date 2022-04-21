import { React } from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar/MenuBar';

/**
 * Rapper class for other components
 * @returns 
 */
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