import { Row} from 'react-bootstrap'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import LearningModulePanel from './LearningModulePanel';
import './LearningDirectory.css'
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
            objs.push(<LearningModulePanel title={newModule.Title} link={newModule.ID} dueDate={newModule.DueDate}/>)
        }
        return objs;
    }

    return (
        <>
         
        <Row className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createDirectoryCards(props.modules)}
        </Row>
        <div className="d-grid gap-2">
        </div>
        </>
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
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: "SELECT * FROM LearningModulesDirectory WHERE ID = " + slug } }).then((response) => {
              setDirectory(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    // Query for getting info on learning modules associated with the directory
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query:"SELECT * FROM LearningModules WHERE DirID = " + slug} }).then((response) => {
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