import {Container} from 'react-bootstrap'
import React from 'react';
import './SettingsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar';
import SettingsMenu from './SettingsMenu';

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