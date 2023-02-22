import { Row} from 'react-bootstrap'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import LearningModulePanel from './LearningModulePanel';
import './LearningDirectory.css'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import env from "react-dotenv";

/**
 * Constructs the content for the Learning Directory Page
 * @param {DirectoryTitle}: props
 * @param {modules}: props
 * @returns Page content of the directory page
 */
const LearningDirectoryPageContent = (props) => {

    /**
     * Create directory cards from modules
     */
    function createDirectoryCards(modules) {
        var dueDate = new Date(props.dueDate); 
        const objs = []
        for (let index in modules) {
            var newModule = modules[index]
            objs.push(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <LearningModulePanel title={newModule.Title} link={newModule.ID} dueDate={dueDate}/>
            </Grid>
            )
        }
        return objs;
    }

    return (
        <Grid container spacing={2}>
            {createDirectoryCards(props.modules)}
        </Grid>
      
    );
}

/**
* Creates and displays the learning directory for each category. 
* @return { LearningDirectoryPage}
*/
const  LearningDirectoryPage = () => {
    let { slug } = useParams();
    const [directory, setDirectory] = useState([])
    const [modules, setModules] = useState([])

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    // Query for getting LearningModules Directory info
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: "SELECT * FROM LearningModulesDirectory" } }).then((response) => {
              setDirectory(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    // Query for getting info on learning modules associated with the directory
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query:"SELECT * FROM LearningModules "} }).then((response) => {
            setModules(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    const directoryTitle = directory.map((directory) => {
        return directory.Title
    })

    return(

        <LearningDirectoryPageContent directoryTitle={directoryTitle +  ' Learning Modules Directory'} modules={modules} />
    );


}

export { LearningDirectoryPageContent }
export default  LearningDirectoryPage;