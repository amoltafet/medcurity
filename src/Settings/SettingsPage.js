import {Container} from 'react-bootstrap'
import React from 'react';
import './SettingsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import SettingsMenu from './SettingsMenu';
import { useEffect, useState } from "react";
import axios from 'axios';
/**
* Creates and displays each the main settings page. 
* @return {SettingsPage}
*/
const SettingsPage = () => {
    return (
        <>
        <MenuBar></MenuBar>
        <Container fluid="md" className="settingsMenuContainer">
        <SettingsMenu></SettingsMenu>
        </Container> 
        </>
    );
}
export default SettingsPage;