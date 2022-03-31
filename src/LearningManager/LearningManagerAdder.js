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
const LearningModuleAdder = (props) => {
    Axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("");
    const [modules, setModules] = useState("");
    const [learningModule, setLearningModule] = useState(0);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    // Query for Learning Modules not included in the company already
    // Assigns learningModule to the first module returned if the list is greater than 0
	useEffect(() => {
        if (!isLoading) {
            Axios.get('http://localhost:3002/api/getQuery', { params: { the_query:'SELECT * ' +
                'FROM LearningModules ' +
                'WHERE NOT EXISTS ( ' +
                    'SELECT lm.* ' +
                    'FROM CompanyLearningModules JOIN LearningModules as lm ' +
                        'ON CompanyLearningModules.LearningModID = lm.ID ' + 
                    'WHERE CompanyLearningModules.CompanyID = ' + props.companyId + ' ' +
                    'AND CompanyLearningModules.LearningModID = LearningModules.ID ' +
                ')'
            } }).then((response) => {
                setModules(Object.values(response.data))     
                if (Object.values(response.data).length > 0)             
                    setLearningModule(Object.values(response.data)[0].ID)
            });
        }
	}, [isLoading])

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const addModule = () => {
        console.log('Adding module: ', learningModule)
        Axios.post("http://localhost:3002/users/assignModulesToCompany",
        { 
        learningModId: learningModule,
        companyid: props.companyId
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("Adding module!")
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
                <input className="createButton" type="button" value="Submit" onClick={addModule} />
            </form>
            <div className="InviteSubtitle font">{message}</div>
                
             
        </Container>
    );
}

export default LearningModuleAdder;