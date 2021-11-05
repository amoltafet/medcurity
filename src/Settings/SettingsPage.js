import {Button, Image, Row, Form, Container, Card} from 'react-bootstrap'
import React from 'react';
import './SettingsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SettingsMenubar from './SettingsMenubar';
import SettingsMenu from './SettingsMenu';

const SettingsPage = () => {
    return (
        <>
    
        <SettingsMenubar></SettingsMenubar>
        <Container fluid="md" className="settingsMenuContainer">
        <SettingsMenu></SettingsMenu>
        </Container> 
        </>
    );
}
export default SettingsPage;