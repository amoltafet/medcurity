import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import React from 'react';
import { Card,  Row } from 'react-bootstrap';
// import env from "react-dotenv";
import axios from 'axios';
import { Button } from '@material-ui/core';
import Grid from '@mui/material/Unstable_Grid2/Grid2';


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
			params: { the_query: `SELECT * FROM CompletedModules WHERE `}
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
              <div className="card card-custom bg-white border-white border-0">
                <div className="card-custom-img card-custom-img-2"></div>
                    <div className="card-custom-avatar">
                        <img className="img-fluid" src={props.img} alt="Card image cap" />
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
            objs.push(
                <Grid item xs={12} sm={6} md={4} lg={3}>
            <ModulePanel title={newModule.Title} link={newModule.ID} dueDate={newModule.DueDate} />
            </Grid>
            )
            size += 1;
        }
        return objs;
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
                fontSize: '30px',
                backgroundColor: '#ffffff',
            }}>All Required Modules </div>
            <Grid container spacing={2} sx={{
                marginLeft: '30px',
                marginRight: '30px',
            }}>
                {createModuleCards(learningModules)}
            </Grid>
           </>
      
    );
}

export default LearningDirectoryRequiredPage;
