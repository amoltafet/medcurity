import { Button, Row, Col } from 'react-bootstrap'
import React from 'react';
import './LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import env from "react-dotenv";

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
            <h1 className="text-center moduleName">
              Learning Modules: {module.Title}
            </h1>
            <div className="d-flex justify-content-center">
              <img src={`data:image/png;base64,${banner}`} className="img-fluid rounded mx-auto d-block moduleImage uvs-left uvs-right" alt={module.Title} />
            </div>

            <h4 className="mt-3 moduleDescription">
              <h6 className="text-center mt-2 moduleSubtitle">
                {module.Subtitle}
              </h6>
              {module.Description}
            </h4>
            </>
        ]);
    })

    return (
        <>
        <div className="learningModuleBg img-fluid ">
          {LearningModuleContent}
          <Row  xs={10} md={10} lg={10} className="justify-content-center">
            <Col xs={8} md={3} lg={3}>
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" href={'/dash'}>
                Back to Dashboard
            </Button>
            </Col>
            <Col xs={8} md={3} lg={3}>
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" href={'/quiz/' + slug}>
                Start {content[0]?.Title || ""} Quiz
            </Button>
            </Col>
          </Row>
        </div>
        </>
    );
}
export default  LearningModule;
