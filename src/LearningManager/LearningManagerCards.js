import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Image, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';
import LearningManagerCard from './LearningManagerCard'

/**
 * Returns Panels of the LearningManager Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @returns 
 */
const LearningManagersCards = () => {
    const userId = 100
    // const [learningModules, setLearningModules] = useState([])
    let learningModules = [
        {Name:"John", Email:"j@gmail.com", Progress:1},
        {Name:"Jack", Email:"ja@gmail.com", Progress:1},
        {Name:"Jen", Email:"je@gmail.com", Progress:21}
    ]

    // Get all of the learningModules that are employed at the company the user is an
    // admin of. Then selects their email, name, completed modules
    // useEffect(() => {
    //     axios.get('http://localhost:3002/api/getQuery', 
    //         { params: { the_query: 'SELECT Users.username, Users.email, Users.userid as UserId, CompanyAdmins.CompanyID as CompanyId ' + 
    //         'FROM AffiliatedUsers ' + 
    //             'JOIN Users ON AffiliatedUsers.UserID = Users.ID ' + 
    //             'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = AffiliatedUsers.CompanyID ' +
    //             'JOIN UserStatistics ON UserStatistics.UserId = Users.ID ' +
    //         'WHERE CompanyAdmins.UserID = ' + userId +
    //         'ASCENDING...'} 
    //         }).then((response) => {
    //             setLearningModules(Object.values(response.data))
    //     });
    // }, [])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createLearningManagerCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<LearningManagerCard email={module.Email} name={module.Name} progress={module.Progress} userId={module.UserId} companyId={module.CompanyId} />)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Container className="EmployerJoinRequests uvs-right">
            <h2>Learning Modules</h2>      
            <Card className="LearningManagerCardHeader uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col sm>
                    <div className="LearningManagerCardValues">User Email</div>
                </Col>
                <Col sm>
                    <div className="LearningManagerCardValues">User Name</div>
                </Col>
                <Col sm>
                    <div className="LearningManagerCardValues">User Progress</div>
                </Col>
                <Col sm>
                    <div className="RemoveButton"></div>
                </Col>
            </Card>
        
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createLearningManagerCards(learningModules)}
            </CardDeck>

        </Container>
        </>
    );
}

export default LearningManagersCards