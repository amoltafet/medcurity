import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar/MenuBar';
import SideBar from '../MenuBar/SideBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
function  LearningDirectoryPage() {
  return (

        <Grid container>
        <Grid item >
            <SideBar />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
        <MenuBar></MenuBar>

        <Outlet />
        </Grid>
        </Grid>

    
  );
}

export default  LearningDirectoryPage;