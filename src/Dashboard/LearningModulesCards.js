import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModulesCards.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
// import env from "react-dotenv";

/**
 * Returns Panels of the Learning Module Cards 
 * @param {obj} user
 * @returns 
 */
const LearningModulesCards = (props) => {
    const userId = String(props.user.userid);
    const [isLoading, setLoading] = useState(true);
    const [learningModules, setLearningModules] = useState([]);
    const [completedModules, setCompletedModules] = useState([]);

    /**
     * Makes sure user data is loaded
     */
    useEffect(() => {
        if (props.user !== undefined) {
            setLoading(false)
        }
    }, [props.user])

    /**
     *  Query for getting user's required learning modules
     */ 
    useEffect(() => {
        if (!isLoading && userId !== undefined) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getAllUserRequiredModules`, 
                { params: { userid: userId }
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            }).catch(error => console.error(`Error ${error}`));
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,{
			params: { the_query: `SELECT * FROM CompletedModules WHERE UserID = '${userId}'`}
            }).then((response) => {
                setCompletedModules(Object.values(response.data));
            })
        }
    }, [userId, isLoading])

    /**
     * Removes compled modules from assigned  
     */
    useEffect(() => {
        if (completedModules.length !== 0 && learningModules !== null) {
            for (let i = 0; i < completedModules.length; i++) {
                for (let j = 0; j < learningModules.length; j++) {
                    if (completedModules[i].LearningModID === learningModules[j].LearningModID && completedModules[i].UserID !== userId) {
                        setCompletedModules(learningModules.splice(j,1)); 
                    }
                }
            }
        }
    }, [learningModules, completedModules, userId, isLoading])

    /**
     * Panel for Module cards
     * @param {} props 
     * @returns 
     */
    const ModulePanel = (props) => {
        var dueDate = new Date(props.dueDate); 
        dueDate.setDate((dueDate.getDate()));
        return (
             <div className="card card-custom bg-white border-white border-0">
             <div className="card-custom-img card-custom-img-2"></div>
                 <div className="card-custom-avatar">
                     <img className="img-fluid" src={props.img ? props.img : "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg"} alt="Card image cap" />
                 </div>
                 <div className="card-body card-body-2">
                     <h4 className="card-title">{props.title}</h4>
                     <p className="card-text">Module {props.link}</p>
                     <h6 className="card-text">Due At: {dueDate.toDateString()}</h6>
                 </div>
                 <div className="card-footer card-footer-2" > 
                     <Button variant="outlined" href={"/learning-module/" + props.link}>View</Button>
                 </div>
                
          </div>
        );
    }

    /**
     * Create directory cards from modules
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createModuleCards(modules, maxLength) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; }
            var newModule = modules[index]
            objs.push(
                <Grid item xs={12} sm={6} md={4} lg={3}>
            <ModulePanel title={newModule.Title} link={newModule.ID} dueDate={newModule.DueDate} img={newModule.Img_url} />
                </Grid>
            )
            size += 1;
        }
        return objs;
    }

    /**
     * This function returns a header for module cards
     * @param {obj} modules 
     */
    function createModuleCardHeader() {
        const objs = [];
        //objs.push(<h2>Required Learning Modules</h2>);

        objs.push(
            <h2 className="text-center requiredModulesRow">&nbsp;  
                <Button
                    id="select-more-modules"
                    href='learning-directory'
                    className="moduleCardHeaderButton font uvs-left">
                    {learningModules.length} remaining required modules
                </Button>
            </h2>
            
        );
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
                <h1 className="text-center">Required Learning Modules</h1>
            
                <Button
                    id="select-more-modules"
                    href='learning-directory'>
                    {learningModules.length} remaining required modules
                </Button>
            <Grid container spacing={3} style={{marginTop: '20px'}}>
                {createModuleCards(learningModules, 5)}
            </Grid>
            
        </div>
        </div>

        
    );
}

export default LearningModulesCards