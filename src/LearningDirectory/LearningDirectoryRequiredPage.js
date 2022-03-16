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
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        });
      }, []);

    useEffect(() => {
        console.log("testing")
        if (session.user != undefined) {
            setLoading(false)
            console.log("changed")
        }
    }, [session])

    

    // Query for getting user's required learning modules
    useEffect(() => {
        console.log("ran")
        if (!isLoading) {
            console.log(String(session.user.userid))
            Axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT * ' +
                'FROM LearningModules JOIN AssignedLearningModules ON LearningModules.ID = AssignedLearningModules.LearningModID ' +
                'WHERE AssignedLearningModules.UserID = ' + String(session.user.userid)} 
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            });
            
        }
    }, [isLoading])


    return(
        <LearningDirectoryPageContent directoryTitle="Required Modules Directory" modules={learningModules} />
    );

}

export default LearningDirectoryRequiredPage;