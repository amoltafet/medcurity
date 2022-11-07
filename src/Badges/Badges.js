import { Image } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import './Badges.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
* Creates and displays the badges that user has and has not earned as a component.
* @return {Badges}
*/
const Badges = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [badges, setBadges] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0]);
        }).catch(error => console.error(`Error ${error}`));
        setLoaded(true)
    }, []);

    useEffect(() => {
            // function used to pull in badges and their icons
            async function getBadges() {
                // let badge_query = `SELECT * FROM Badges LEFT JOIN (SELECT * FROM earnedBadges WHERE userID = ${currentUser.userid}) AS earnedBadges ON badges.id = earnedBadges.badgeID`
                let badge_query = `SELECT * FROM Badges`
                // let badgesListA = (await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                //    { params: { the_query: badge_query }}).catch(error => console.error(`Error ${error}`))).data;
                // console.log(badgesListA)
                
                let badgesList = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                    { params: { the_query: badge_query}}).catch(error => console.error(`Error ${error}`));
                badgesList = badgesList.data;
                
                for (let i = 0; i < badgesList.length; i++) {
                    let badge = badgesList[i];
                    let badgeImage = (await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getBadgeImage`, { params: { id: badge.id }})
                        .catch(error => console.error(`Error ${error}`))).data.badgeImage;
                    badgesList[i].image = badgeImage

                    let userBadgeQuery = `SELECT * FROM earnedBadges WHERE userID = ${currentUser.userid} AND badgeID = ${badge.id}`;
                    let userBadge = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                    { params: { the_query: userBadgeQuery}}).catch(error => console.error(`Error ${error}`));
                    userBadge = userBadge.data;
                    
                    console.log(userBadge);
                    if (userBadge.length === 0) {
                        badgesList[i].earned = false;
                    }
                    else {
                        badgesList[i].earned = true;
                    }
                }

                setBadges(badgesList);
            }
        
        getBadges();
    },[currentUser, isLoaded]);

    return (
       <>
            <div className='badgeContainer'>
                    {badges.map(badge => {
                        // setting class depending on if user has earned the badge or not
                        let className = "";
                        if (badge.earned) {
                            className = "earned";
                        } else {
                            className = "unearned";
                        }

                        // each badge leads to this output
                        const classes = `indivBadge ${className}`;
                        
                        return (<div key={badge.id}  className={classes}>
                            <Image className={className} src={`data:image/png;base64,${badge.image}`} alt="Badge Icon"></Image>
                            <div className='badgeTitle'>{badge.name}</div>
                        </div>    
                    )})}
            </div>
       </>
    );
}

export default Badges;