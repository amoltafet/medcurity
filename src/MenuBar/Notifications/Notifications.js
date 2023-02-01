import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios';
import Data from './NotifData'

const Notifications = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [notifs, setNotifs] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0]);
        }).catch(error => console.error(`HERE Error ${error}`));
        setLoaded(true)
    }, []);

    useEffect(() => {
        // function used to pull in notifications for that user
        async function getNotifications() {
            let userNotifs = (await axios.get(`${process.env.REACT_APP_BASE_URL}/users/notifications`, { params: { userid: currentUser.userid }})
                .catch(error => console.error(`Error ${error}`)));
            userNotifs = userNotifs.data;
            
            if (userNotifs.success) {
                userNotifs = userNotifs.result;
                setNotifs(userNotifs);
            }
        }
    
        if (currentUser.userid) {
            getNotifications();
        }
    },[currentUser, isLoaded]);

    if (notifs.length === 0) {
        return (
            <>
                {Data.map((item, index) => {
                    return (
                        <Container key={index} >
                            <Row className="row">
                                <Col xs lg="2">
                                <i class={`bi bi-${item.icon} text-${item.color}`}></i>
                                </Col>
                                <Col >
                                    <h6 > {item.title}</h6>   
                                </Col>
                            </Row>
                            <Row className="row">
                            <p className="float-right text-muted text-sm">{item.time}</p>
                            </Row>
                        </Container>
                    )
                })}
            </>
        );
    }
    else {
        return (
            <>
                {Data.map((item, index) => {
                    return (
                        <Container key={index} >
                            <Row className="row">
                                <Col xs lg="2">
                                <i class={`bi bi-${item.icon} text-${item.color}`}></i>
                                </Col>
                                <Col >
                                    <h6 > {item.title}</h6>   
                                </Col>
                            </Row>
                            <Row className="row">
                            <p className="float-right text-muted text-sm">{item.time}</p>
                            </Row>
                        </Container>
                    )
                })}
            </>
        );
    }
}

export default Notifications
