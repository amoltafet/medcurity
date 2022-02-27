import React from 'react';
import './LearningDirectoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { LearningDirectoryPageContent } from './LearningDirectoryPage';

const LearningDirectoryRequiredPage = () => {
    let userId = 100
    const [learningModules, setLearningModules] = useState([])

    // Query for getting user's required learning modules
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT * FROM LearningModules JOIN AssignedLearningModules ON LearningModules.ID = AssignedLearningModules.LearningModID WHERE AssignedLearningModules.UserID = ' + userId} 
            }).then((response) => {
                setLearningModules(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [userId])


    return(
        <LearningDirectoryPageContent directoryTitle="Required Modules Directory" modules={learningModules} />
    );

}

export default LearningDirectoryRequiredPage;