import { Button } from 'react-bootstrap'
import React from 'react';
import './LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';

/**
* Creates and displays the learning page for each test category. 
* @return { LearningModule }
*/
const  LearningModule = () => {
    let { slug } = useParams();
    const [content, setContent] = useState([])
    const [banner, setBanner] = useState([])

    useEffect(() => { }, [slug]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/getModuleInfo', { params: { id: slug } }).then((response) => 
        { 
          console.log(response.data)
          setContent(Object.values(response.data)) 
        }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    useEffect(() => { axios.get("http://localhost:3002/api/getModuleBanner", { params: { id: slug }} ).then((response) => { setBanner(response.data.bannerImage) }); })

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
        <div className="d-grid gap-2 justify-content-center">
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" href={'/quiz/' + slug}>
                Start {content[0]?.Title || ""} Quiz
            </Button>
          </div>
        </div>
        </>
    );
}
export default  LearningModule;
