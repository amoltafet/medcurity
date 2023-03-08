import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from '../MenuBar/MenuBar';
import SideBar from '../MenuBar/SideBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
function  LearningDirectoryPage() {
  return (

        <Grid container>
        <Grid item xs={2}>
            <SideBar />
        </Grid>
        <Grid item xs={10}>
        <MenuBar></MenuBar>

        <Outlet />
        </Grid>
        </Grid>

    
  );
}

export default  LearningDirectoryPage;