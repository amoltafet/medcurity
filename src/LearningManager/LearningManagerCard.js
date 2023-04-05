/*
File Name: LearningManagerCard.js
Description: This file contains the card that
    displays a currently assigned learning module. The card
    allows an employer to change the due date or remove the module from assignment.
Last Modified: February 14, 2023
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './LearningManager.css';
import { useState, useEffect} from "react";
import axios from 'axios';
import DatePicker from 'react-date-picker';
import { TableCell, TableRow } from '@material-ui/core';

/**
 * Panel for LearningModuleCard
 * @param {int} moduleID
 * @param {int} companyID 
 * @param {function} setReload
 * @param {str} learningModuleName
 * @param {str} dueDate 
 */
const LearningManagerCard = (props) => {
    const [dateDue, setDateDue] = useState();

    // Updates the current due date
    useEffect(() => {
        if (props.dueDate !== undefined) {
            setDateDue(new Date(props.dueDate));
        }
    }, [props.dueDate])

    // Updates the due date whenever it changes
    function updateModuleDate(dateDue) {
        setDateDue(dateDue);
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/updateDueDate`,
        { moduleid: props.moduleID, companyid: props.companyID, dueDate: dateDue}).then((response) => {
            if (response.data.success) {
                props.setReload(true);
            }
            else {
                console.log("Error: ", response.data.error);
            }
        }).catch((err) => console.log("Error: ", err));
    }
 
    // Removes a module from currently assigned modules
    function removeModule(moduleid, companyid) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/removeModule`,
        { moduleid: moduleid, companyid: companyid }).then((response) => {
            if (response.data.success) {
                props.setReload(true);
            }
            else {
                console.log("Error: ", response.data);
            }
        }).catch((err) => console.log("Error: ", err));
    }

    return (
        <TableRow
        key={props.learningModuleName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align='left'>{props.learningModuleName} </TableCell>
        <TableCell align='center'>  <div><DatePicker className=" uvs-left learning_module_date_picker" onChange={(value) => updateModuleDate(value)} value={dateDue}></DatePicker></div></TableCell>
        <TableCell align='right'> <Button className="uvs-right learning_module_remove_button" onClick={() => removeModule(props.moduleID, props.companyID)}>Remove</Button></TableCell>
      
        </TableRow>
    );
}

export default LearningManagerCard;