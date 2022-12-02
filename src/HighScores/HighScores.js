import { Image } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import './HighScores.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
* Creates and displays the badges that user has and has not earned as a component.
* @return {HighScores}
*/
const HighScores = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0]);
        }).catch(error => console.error(`Error ${error}`));
        setLoaded(true)
    }, []);

    
    useEffect(() => {
        // function used to pull in high scores for the user
        async function getScores() {     
            let highScores = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/highScores`,
                { params: { userid: currentUser.userid }}).catch(error => console.error(`Error: ${error}`));
            
            highScores = highScores.data;
            if (highScores.success) {
                highScores = highScores.result;
                setScores(highScores);
            }
        }
    
    if (currentUser.userid) {
        getScores();
    }
}, [currentUser, isLoaded]);

    if (scores.length !== 0) {
        return (
        <>
        <div>
                {scores.map(score => {
                    return (<div key={score.moduleID}  className="highscore">
                        {score.title}: {score.highscore} points
                    </div>    
                )})}
        </div>
        </>
        );
    }
    else {
        return <>There are currently no high scores to display...</>
    }
}

export default HighScores;