import React from 'react';
import './LearningDirectoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import Axios from 'axios';
import { LearningDirectoryPageContent } from './LearningDirectoryPage';

const LearningDirectoryRequiredPage = () => {
    const [learningModules, setLearningModules] = useState([])
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);

    const userId = session.map((session) => {
        let id = String(session.user.userId);
        console.log('Hello')
        if (id == undefined) {
            return '0';
        }
        else {
            return id;
        }
    })

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        });
      }, []);

    // Query for getting user's required learning modules
    useEffect(() => {
        Axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT * ' +
            'FROM LearningModules JOIN AssignedLearningModules ON LearningModules.ID = AssignedLearningModules.LearningModID ' +
            'WHERE AssignedLearningModules.UserID = ' + String(session.user.userId)} 
            }).then((response) => {
                setLearningModules(Object.values(response.data))
        });
    }, [])


    return(
        <LearningDirectoryPageContent directoryTitle="Required Modules Directory" modules={learningModules} />
    );

}

export default LearningDirectoryRequiredPage;