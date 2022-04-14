import React from 'react';
import { Form , Card, Button, Container, Dropdown, Item, Row} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './LearningManagerAdder.css'
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
	}, [isLoading, props.reload])

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
            props.setReload(true)
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
        <Card className="Learning_Manager_Invite_Request_Card uvs-right">
             <Row xs={7} md={12} lg={12}> 
                <Card.Title className="register_header_add_learning_module"><b>Add a Learning Module: </b></Card.Title>
            </Row>
            <Row xs={7} md={12} lg={12}> 
                <Card.Subtitle className="invite_subtitle_learning_manager">Choose a learning module to assign it to all your employees.</Card.Subtitle>
            </Row>
            <Row xs={2} md={7} lg={12}  className="justify-content-center text-center">
                <form className="learningModule_add_module_form_container" onSubmit={addModule}>
                    <label className="learningModule_add_module_form">
                    
                        <select className="learningModule_add_module_form" value={learningModule} 
                            onChange={ (e) => 
                            {
                                setLearningModule(e.target.value);
                                console.log(e.target.value);
                            }}>
                            {createDropDownOptions(modules)}
                        </select>
                    </label>
                </form>
                <div className="invite_subtitle_learning_manager">{message}</div>
            </Row>
            <Row xs={2} md={7} lg={7} className="justify-content-center">
                <Button className="create_button_learning_manager uvs-left" onClick={addModule}>Submit</Button>
            </Row>
                
             
        </Card>
    );
}

export default LearningModuleAdder;