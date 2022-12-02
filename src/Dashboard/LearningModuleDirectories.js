import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleDirectories.css'
import { Card, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
// import env from "react-dotenv";

/**
 * Returns Panels of the Learning Module Directories 
 * NOTE: Not in use as of 4/20/2022
 * @returns 
 */
const LearningModuleDirectories = () => {
    const [directories, setDirectories] = useState([])

    // Query for getting LearningDirectories Directory info
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: "SELECT * FROM LearningModules"} }).then((response) => {
              setDirectories(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [])



    /**
     * Panel for directories
     * @param {} props 
     * @returns 
     * title, description, image, link, subtitle
     */
    const DirectoryPanel = (props) => {
        return (
            <div className="card card-custom bg-white border-white border-0">
                <div className="card-custom-img card-custom-img-2"></div>
                    <div className="card-custom-avatar">
                        <img className="img-fluid" src="http://res.cloudinary.com/d3/image/upload/c_pad,g_center,h_200,q_auto:eco,w_200/bootstrap-logo_u3c8dx.jpg" alt="Avatar" />
                    </div>
                    <div className="card-body card-body-2">
                        <h4 className="card-title">{props.title}</h4>
                        <p className="card-text">Module {props.link}</p>
                        <h6 className="card-text">{props.description}</h6>
                    </div>
                    <div className="card-footer card-footer-2" >
                        <a href={"/learning-module/" + props.link} className="btn btn-outline-primary px-5">View</a>
                    </div>
             </div>
        )
    }
 
    /**
     * Create directory cards from modules
     */
    function createDirectoriesCards(modules) {
        const objs = []
        for (let index in modules) { 
            var module = modules[index]
            console.log(module)
            objs.push(
            <div className="col-md-3">
                <DirectoryPanel title={module.Title} link={module.ID} description={module.Subtitle} img={module.Banner}/>
            </div>
            
            )
        }
        return objs;
    }

    return (
        <>
        <Row className="LearningModulesDirectoriesDashboard ms-2" >
            {createDirectoriesCards(directories)}
        </Row>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}

export default LearningModuleDirectories