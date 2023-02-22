import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleDirectories.css'
import { Card, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
// import env from "react-dotenv";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Button } from '@mui/material';
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
                    <img className="img-fluid" src={props.img ? props.img : "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg"} alt="Card image cap" />
                    </div>
                    <div className="card-body card-body-2">
                        <h4 className="card-title">{props.title}</h4>
                        <p className="card-text">Module {props.link}</p>
                        <h6 className="card-text">{props.description}</h6>
                    </div>
                    <div className="card-footer card-footer-2" > 
                        <Button variant="outlined" href={"/learning-module/" + props.link}>View</Button>
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
            objs.push(
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <DirectoryPanel title={module.Title} link={module.ID} description={module.Subtitle} img={module.Img_url}/>
            </Grid>
            
            )
        }
        return objs;
    }

    return (
        <div className="container">
        <div style={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: '20px',
        }}>
                <h1 className="text-center">Additional Learning Modules</h1>
            
                <Button
                    id="select-more-modules"
                    href='learning-directory'>
                    {directories.length} modules
                </Button>
        </div>
            <Grid container spacing={2}>
                {createDirectoriesCards(directories)}
            </Grid>
        </div>
    );
}

export default LearningModuleDirectories