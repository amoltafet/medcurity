import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios';
import './Notifications.css'
const Notifications = (props) => {
    axios.defaults.withCredentials = true;
    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        setNotifs(props.userNotifs)
    },[]);

    const getIcon = (notif) => {
        let color = "primary";
        let icon = "bell-fill";

        switch(notif.type) {
            case "welcome":
                icon = "person-fill";
                color = "info";
                break;
            case "assignment":
                icon = "binoculars";
                color = "dark";
                break;
            case "reminder":
                icon = "calendar-event";
                color = "primary";
                break;
            case "badge":
                icon = "balloon";
                color = "danger";
                break;
            case "message":
                icon = "chat-right-text";
                color = "success";
                break;
            default:
                break;
        }

        return `bi bi-${icon} text-${color}`;
    }

    const getTime = (notif) => {
        let time = "";
        let notifDate = new Date(notif.timesent);
        let today = new Date();
        let difference = today.getTime() - notifDate.getTime();
        let daysDifference = difference / (1000 * 60 * 60 * 24);
        
        if (daysDifference < 1) {
            let hoursDifference = difference / (1000 * 60 * 60);
            if (hoursDifference < (1 / 60)) {
                time = "Just now";
            }
            else if (hoursDifference < 1) {
                time = Math.floor(hoursDifference * 60) + " minutes ago";
            }
            else {
                time = Math.floor(hoursDifference) + " hours ago";
            }
        }
        else if (daysDifference < 7) {
            time = Math.floor(daysDifference) + " days ago";
        }
        else {
            time = Math.floor(daysDifference / 7) + " weeks ago";
        }
    
        return time;
    }

    if (notifs.length === 0) {
        return (
            <Container>
                <Row className="row">
                    <Col xs lg="2">
                    <i className="bi bi-bell-slash text-danger"></i>
                    </Col>
                    <Col className='my-auto'>
                        <h6 className='my-auto'>No notifications</h6>   
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        return (
            <div className="notificationsHolder">
                {notifs.map((item, index) => {
                    let icon = getIcon(item);
                    let time = getTime(item);
                    return (
                        <Container key={index} >
                            <Row className="row">
                                <Col xs lg="2">
                                <i class={icon}></i>
                                </Col>
                                <Col className='my-auto'>
                                    <h6 className='my-auto'>{item.message}</h6>   
                                </Col>
                            </Row>
                            <Row className="row">
                            <p className="float-right text-muted text-sm">{time}</p>
                            </Row>
                        </Container>
                    )
                })}
            </div>
        );
    }
}

export default Notifications
