/*
File Name: LearningModuleAdder.js
Description: This file contains the widget for assigning Learning Modules to employees
    of a company by a user with employer privledges. It is accessed in the upper-right
    corner of the learning-manager page, and is used in the LearningManagerDashboard.
Last Modified: February 14, 2023
*/

import React from 'react';
import {Card, Row} from 'react-bootstrap';
import { useEffect, useState} from "react";
import './LearningManagerAdder.css'
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * This class allows employers to assign LearningModules to their employees.
 * @param {int} companyID
 * @param {bool} reload
 * @param {function} setReload
 */
const LearningModuleAdder = (props) => {
    axios.defaults.withCredentials = true;
    const [message, setMessage] = useState("");
    const [modules, setModules] = useState("");
    const [learningModule, setLearningModule] = useState(0);
    const [isLoading, setLoading] = useState(true)
    
    // Manages the loading state for companyId
    useEffect(() => {
        if (Number.isInteger(props.companyID)) {
            setLoading(false)
        }
    }, [props.companyID])

    // Query for LearningModules not included assigned by the company already
    // Assigns LearningModule with the first module returned
	useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/modules/unassignedModules`, { params: { companyid: props.companyID
            } }).then((response) => {
                setModules(Object.values(response.data))     
                if (Object.values(response.data).length > 0)             
                    setLearningModule(Object.values(response.data)[0].ID)
            });
        }
	}, [isLoading, props.reload, props.companyID])

    /**
     * Adding a module based on current learningModule variable
     * @param {array} items 
     */
    const addModule = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/assignModule`,
        {moduleid: learningModule, companyid: props.companyID}).then((response) => {
            if (response.data.success && response.data.added) {
                props.setReload(true)
            }
            else if (response.data.success && !response.data.added) {
                setMessage('This learning module is already assigned! Please try a different learning module.');
            }
        }).catch((error) => console.log("Error while atttempting to add module: ", error));
    };

    /**
     * Create an HTML list of options
     * @param {array} items 
     */
    function createDropDownOptions(items) {
        const dropdownList = [];
        for (let index in items) {
            let item = items[index];
            dropdownList.push(<MenuItem value={item.ID}>{item.Title}</MenuItem>); 
        }
        return dropdownList;
    }

    const handleChange = (e) => {
        setLearningModule(e.target.value);
        addModule();
      };

    return (
        <Card  style={{
            width: '100%',
            height: '100%',
            padding: '1rem',
            marginTop: '3rem',
        }}>
            <Typography variant="h4">
                Add a Learning Module
            </Typography>
           
            <Typography variant="subtitle1" >
            Choose a learning module to assign to all of your employees.
            </Typography>
            <div style={{
                color: 'red',
                marginTop: '1rem',
            }}>{message}</div>
        
            <Box sx={{ minWidth: 120, marginTop: 2, width: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Modules</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={learningModule}
                        label="Learning Modules"
                        onChange={handleChange}
                        >
                         {createDropDownOptions(modules)}
                        </Select>
                    </FormControl>
                    
                    </Box>
                   
            

                  
        </Card>
    );
}

export default LearningModuleAdder;