import React from 'react';
import './LearningDirectoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import Axios from 'axios';
import { LearningDirectoryPageContent } from './LearningDirectoryPage';

const LearningDirectoryRequiredPage = () => {
    const [learningModules, setLearningModules] = useState([])
    Axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          setCurrentUser(response.data.user[0])
        });
      }, []);

    useEffect(() => {
        if (currentUser.userid !== undefined) {
            setLoading(false)
        }
    }, [currentUser])

    // Query for getting user's required learning modules
    useEffect(() => {
        if (!isLoading) {
            Axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
                { params: { userid: currentUser.userid }
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            }).catch(error => console.error(`Error ${error}`));
        }
    }, [currentUser.userid, isLoading])

    return(
        <LearningDirectoryPageContent directoryTitle="Required Modules Directory" modules={learningModules} />
    );

}

export default LearningDirectoryRequiredPage;