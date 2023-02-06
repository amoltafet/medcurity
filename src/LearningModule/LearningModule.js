import {  Row, Col } from 'react-bootstrap'
import React from 'react';
import './LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import env from "react-dotenv";

/**
* Creates and displays the learning page for a given learning module
* @return {  } LearningModule
*/
const  LearningModule = () => {
    let { slug } = useParams();
    const [content, setContent] = useState([])
    const [banner, setBanner] = useState([])

    useEffect(() => { }, [slug]);

    // Get the information for the module
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getModuleInfo`, { params: { id: slug } }).then((response) => 
        { 
          setContent(Object.values(response.data)) 
        }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    useEffect(() => { axios.get(`${process.env.REACT_APP_BASE_URL}/api/getModuleBanner`, { params: { id: slug }} ).then((response) => { setBanner(response.data.bannerImage) }); })

    // Creates the content, complete with image and description
    const LearningModuleContent = content.map((module) => {
        return ([
          <>
            <Grid container>
              <img src={`data:image/png;base64,${banner}`} className="img-fluid rounded mx-auto d-block moduleImage uvs-left uvs-right" alt={module.Title} />
            </Grid>
            <h1 className="text-center moduleName">
              {module.Title}
            </h1>
            <Grid container sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <h4 className="mt-3 moduleDescription">
              <h6 className="text-center mt-2 moduleSubtitle">
                {module.Subtitle}
              </h6>
              {module.Description}
            </h4>
            </Grid>
            </>
        ]);
    })

    return (
        <Grid container sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <div className="learningModuleBg img-fluid ">
          {LearningModuleContent}
          <Row  xs={10} md={10} lg={10} className="justify-content-center">
            <Col xs={8} md={3} lg={3}>
              <Button variant="primary"  href={'/dash'} sx={{width: '100%'}}>
                  Back to Dashboard
              </Button>
            </Col>
            <Col xs={8} md={3} lg={3}>
              <Button variant="outlined" href={'/quiz/' + slug} sx={{width: '100%'}}>
                  Start {content[0]?.Title || ""} Quiz
              </Button>
            </Col>
          </Row>
        </div>
        </Grid>
    );
}
export default LearningModule;
