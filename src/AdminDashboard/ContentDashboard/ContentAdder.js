import React from 'react';
import { Form , Card, Button, Container, Dropdown, Item} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './ContentDashboard.css'
import axios from 'axios';
import env from "react-dotenv";

/**
 * This class allows employers to enter in future user learningModules.
 * Inputs are validated, then new users are added
 */
const LearningModuleAdder = (props) => {
    axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("");
    const [modules, setModules] = useState("");
    const [learningModule, setLearningModule] = useState("");
    // let modules = [
    //     {ID: '1', Title: 'privacy'},
    //     {ID: '2', Title: 'code'}
    // ];
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    // Query for Learning Modules not included in the company already
	// useEffect(() => {
    //     if (!isLoading) {
    //         axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query:'SELECT * ' +
    //             'FROM LearningModules ' +
    //                 'WHERE NOT EXISTS ( ' +
    //                     'SELECT * ' +
    //                     'FROM CompanyLearningModules ' + 
    //                     'WHERE CompanyLearningModules.CompanyID != ' + props.companyId + ' ' +
    //                     'AND CompanyLearningModules.LearningModID = LearningModules.ID ' +
    //                 ')'
    //         } }).then((response) => {
    //             setModules(Object.values(response.data))
    //         });
    //     }
	// }, [isLoading])

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const addModule = () => {
        console.log('Adding', learningModule)
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,
        { 
        learningModule: learningModule,
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("Adding!")
            
        }
        else if (response.data === false)
        {
            console.log("Already added!")
            setMessage('This learning Module is already assigned! Please try a different learningModule.')
        }
        });
    };

    


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
            {/* <Form className="learningModule Invite">
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
            </Form> */}
            <form onSubmit={addModule}>
                <label>
                  
                    <select className="learningModule" value={learningModule} 
                        onChange={ (e) => 
                        {
                            setLearningModule(e.target.value);
                            console.log(e.target.value);
                        }}>
                        {createDropDownOptions(modules)}
                    </select>
                </label>
                <input className="createButton" type="submit" value="Submit" onClick={addModule} />
            </form>
            <div className="InviteSubtitle font">{message}</div>
                
             
        </Container>
    );
}

export default LearningModuleAdder;