import React from 'react';
import { Form , Card, Button, Container, Dropdown, Item} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './LearningManager.css'
import Axios from 'axios';

/**
 * This class allows employers to enter in future user learningModules.
 * Inputs are validated, then new users are added
 */
const LearningModuleAdder = () => {
    Axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("");
    //const [modules, setModules] = useState("");
    const [learningModule, setLearningModule] = useState("");
    const navigate = useNavigate();
    let modules = [
        {ID: '1', Title: 'privacy'},
        {ID: '1', Title: 'code'}
    ];

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const addModule = () => {
        console.log('Adding', learningModule)
        Axios.post("http://localhost:3002/users/register",
        { 
        learningModule: learningModule,
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("A new invitation!")
            navigate('/employer-dash');
        }
        else if (response.data === false)
        {
            console.log("Already has account!")
            setMessage('This learningModule is already associated with an account! Please try a different learningModule.')
        }
        });
    };

    // // Query for getting info on learning modules
    // useEffect(() => {
    //     Axios.get('http://localhost:3002/api/getQuery', { params: { the_query:"SELECT * FROM LearningModules"} }).then((response) => {
    //         setModules(Object.values(response.data))
    //     });
    // }, [])

    function createDropDownOptions(items) {
        const dropdownList = [];
        for (let index in items) {
            let item = items[index];
            dropdownList.push(<option classname="learningModule font" value={item.ID}>{item.Title}</option>); 
        }
        return dropdownList;
    }

    return (
        <Container className="LearningManagerInviteRequestCard uvs-right">

                
            <div className="registerHeader">Add a Learning Module: </div>
            <div className="InviteSubtitle font">Choose a learning module to assign it to all your employees.</div>
            <Form className="learningModule Invite">
                <Form.Group className="learningModule" controlId="formlearningModule">
                    <Form.Control 
                    type="learningModule" 
                    placeholder="learningModule"
                    
                    onChange={ (e) => 
                    {
                        setLearningModule(e.target.value);
                    }}/>
                </Form.Group>
                
                <Form.Text className="registerMessage">{message}</Form.Text>
                <Button className="createButton" variant="secondary" type="button" onClick={addModule}>Add Module</Button>
            </Form>
            <form onSubmit={addModule}>
                <label>
                  
                    <select value={learningModule} 
                        onChange={ (e) => 
                        {
                            setLearningModule(e.target.value);
                            console.log(e.target.value);
                        }}>
                        {createDropDownOptions(modules)}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
                
             
        </Container>
    );
}

export default LearningModuleAdder;