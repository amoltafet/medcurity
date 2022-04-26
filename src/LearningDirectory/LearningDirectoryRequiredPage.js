import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import React from 'react';
import { Card,  Row } from 'react-bootstrap';
// import env from "react-dotenv";
import axios from 'axios';


const LearningDirectoryRequiredPage = () => {
    axios.defaults.withCredentials = true;
    const [isLoading, setLoading] = useState(true);
    const [learningModules, setLearningModules] = useState([]);
    const [completedModules, setCompletedModules] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

   /**
   *  grabs user session to store points 
   */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
        setCurrentUser(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
    }, []);


    /**
     * Makes sure user data is loaded
     */
    useEffect(() => {
        if (currentUser !== undefined) {
            setLoading(false)
        }
    }, [currentUser])

    
    /**
     *  Query for getting user's required learning modules
     */ 
     useEffect(() => {
        if (!isLoading && currentUser.userid !== undefined) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getAllUserRequiredModules`, 
                { params: { userid: currentUser.userid }
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            }).catch(error => console.error(`Error ${error}`));
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,{
			params: { the_query: `SELECT * FROM CompletedModules WHERE UserID = '${currentUser.userid}'`}
            }).then((response) => {
                setCompletedModules(Object.values(response.data));
            })
        }
    }, [currentUser, currentUser.userid, isLoading])

    /**
     * Removes compled modules from assigned  
     */
    useEffect(() => {
        if (completedModules.length !== 0 && learningModules !== null) {
            for (let i = 0; i < completedModules.length; i++) {
                for (let j = 0; j < learningModules.length; j++) {
                    if (completedModules[i].LearningModID === learningModules[j].LearningModID ) {
                       setCompletedModules(learningModules.splice(j,1));    
                    }
                }
            }
        }
    }, [currentUser, learningModules, completedModules])

    /**
     * Panel for Module cards
     * @param {} props 
     * @returns 
     */
    const ModulePanel = (props) => {
        var dueDate = new Date(props.dueDate); 
        dueDate.setDate((dueDate.getDate()));
        return (
           
            <>
            <a href={"/learning-module/" + props.link} style={{ cursor: "pointer" }} className="LearningModuleCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Title className="testPanelFont" href={"/learning-module/" + props.link} >{props.title}</Card.Title>
                   <Card.Text className="dueDateRequiredModule">Due At: {dueDate.toDateString()}</Card.Text>
                </Card.Body> 
            </a>
            </>
        );
    }

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createModuleCards(modules) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            var newModule = modules[index]
            objs.push(<ModulePanel title={newModule.Title} link={newModule.ID} dueDate={newModule.DueDate} />)
            size += 1;
        }
        return objs;
    }

    return (
        <><div className="all_reuired_modules_header ">All Required Modules</div>
            <Row className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
                {createModuleCards(learningModules)}
            </Row>
            <div className="d-grid gap-2">
            </div>
        </>
    );
}

export default LearningDirectoryRequiredPage;
