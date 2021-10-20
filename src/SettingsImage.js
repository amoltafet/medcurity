import React from 'react';
import './SettingsImage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Image} from 'react-bootstrap'

const SettingsImage = () => {
  return (
    <>
    <Container className="settingsContainer">
        <Button href="/dashboard">X</Button>
    <Image className="settingsImage" variant="top" src="/usersettings.jpg" alt=""  ></Image>
    </Container>
    </>
  );
}

export default SettingsImage;
