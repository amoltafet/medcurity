import { Button, Image } from 'react-bootstrap'
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

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/getModuleInfo', { params: { id: slug } }).then((response) => {
              setContent(Object.values(response.data))
          }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    useEffect(() => { axios.get("http://localhost:3002/api/getModuleBanner", { params: { id: slug }} ).then((response) => { setBanner(response.data.bannerImage) }); })

    const LearningModuleContent = content.map((module) => {
      if (module.Banner !== "") {
        return ([
          <>
            <h1 className="text-center moduleName">
              Learning Modules: {module.Title} Module
            </h1>
            <div className="d-flex justify-content-center">
              {console.log("../assets/" + module.Banner)}
              {console.log("banner: " + module.Banner)}
              <Image src={require(`../assets/` + module.Banner)} className="img-fluid rounded mx-auto d-block moduleImage uvs-left uvs-right" alt={module.Title} />
            </div>
            <h6 className="text-center mt-2 moduleSubtitle">
              {module.Subtitle}
            </h6>
            <h4 className="text-center mt-3 moduleDescription">
              {module.Description}
            </h4>
            </>
        ]);
      }
      else {
      return ([
          <>
            <h1 className="text-center moduleName">
              Learning Modules: {module.Title} Module
            </h1>
            <div className="d-flex justify-content-center">
            </div>
            <h6 className="text-center mt-2 moduleSubtitle">
              {module.Subtitle}
            </h6>
            <h4 className="text-center mt-3 moduleDescription">
              {module.Description}
            </h4>
            </>
      ]);
      }
    })

    return (
        <>
         <div className="learningModuleBg img-fluid ">
        {LearningModuleContent}
        <div className="d-grid gap-2 ">
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" href={'/quiz/' + slug}>
                Go to Quiz
            </Button>
          </div>
        </div>
        </>
    );
}
export default  LearningModule;
