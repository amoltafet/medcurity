import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import './LeaderboardProfile.css'


/**
* Creates and displays each users leaderboard profile. 
* @param {Array} className the css style to display. 
* @param {user} user the user grabed from the dashboard.
* @return {GetPage}
*/
function LeaderboardProfile(props) {
    return (
        <>
       
            <Accordion className="userPanel" defaultActiveKey="0">
                <Accordion.Toggle eventKey="1" className="accordianToggel">
                <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                    <div></div>
                    <Row>
                        <Card.Text className="userNameTitle">{props.name}</Card.Text>
                        <Image className={props.className[1]} src="/user.png" alt="" roundedCircle />
                    </Row>    
                    <Row>
                            <Card.Text className={props.className[2]}>Category 1</Card.Text>
                        
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 2</Card.Text>
                 
                    
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 3</Card.Text>
       
                       
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 4</Card.Text>
                   
                       
                    </Row>
                    <Row>
                        
                            <Card.Text className={props.className[2]}>Category 5</Card.Text>
                       
                       
                    </Row>

                </Card>
            
                </Accordion.Toggle>
                <Accordion.Collapse className="accordianCollapse" eventKey="1">
                   <Card.Body>
                        <Row>
                            <Card.Body>Hello</Card.Body>
                        </Row>
                   </Card.Body>
                </Accordion.Collapse>
            </Accordion>
     
        </>
    );
}

export default LeaderboardProfile;