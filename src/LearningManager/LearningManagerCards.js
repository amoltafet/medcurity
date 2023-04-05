/*
File Name: LearningManagerCards.js
Description: This file contains the widget that contains the cards
    displaying the currently assigned learning modules. These cards
    allow an employer to change the due date or remove the module from assignment.
Last Modified: February 14, 2023
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import axios from 'axios';
import LearningManagerCard from './LearningManagerCard'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@material-ui/core';

/**
 * Returns Panels of the LearningManager Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @param {int} companyID
 * @param {bool} reload
 * @param {function} setReload
 */
const LearningManagersCards = (props) => {
    const [currLearningModules, setCurrLearningModules] = useState([])
    const [dueLearningModules, setDueLearningModules] = useState([])
    const [isLoading, setLoading] = useState(true)

    // Manage the loading state for later useEffects
    useEffect(() => {
        if (Number.isInteger(props.companyID)) {
            setLoading(false)
        }
    }, [props.companyID])

    // Get all of the LearningModules in a company
    useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
                { params: { the_query: 'SELECT * ' +
                'FROM CompanyLearningModules ' + 
                    'JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ' + 
                'WHERE CompanyLearningModules.CompanyID = ' + String(props.companyID)  
                }}).then((response) => {
                    let learningModules = Object.values(response.data);
                    let today = new Date();
                    let currLMs = [];
                    let dueLMs = [];

                    learningModules.forEach(lm => {
                        let dueDate = new Date(lm.DueDate);
                        let difference = today.getTime() - dueDate.getTime();
                        if (difference <= 0) {
                            currLMs.push(lm);
                        }
                        else {
                            dueLMs.push(lm);
                        }
                    });

                    setCurrLearningModules(currLMs);
                    setDueLearningModules(dueLMs);
            });
        }
    }, [isLoading, props.reload, props.companyID])

    /**
     * Create directory cards from modules
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createLearningManagerCards(modules) {
        const objs = [];
        for (let index in modules) {
            let module = modules[index];
            objs.push(<LearningManagerCard learningModuleName={module.Title} moduleID={module.ID} companyID={module.CompanyID} dueDate={module.DueDate} setReload={props.setReload}/>);
        }
        return objs;
    }

    return (
        <>
        <Typography variant="h4" className="uvs-left">Upcoming Learning Modules</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Learning Module Name</TableCell>
                        <TableCell align="center">Date Due (PST)</TableCell>
                        <TableCell align="right">Remove Module</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {createLearningManagerCards(currLearningModules)}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography variant="h4" className="uvs-left" style={{
            marginTop: '20px'
        }}>Due Learning Modules</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Learning Module Name</TableCell>
                        <TableCell align="center">Date Due (PST)</TableCell>
                        <TableCell align="right">Remove Module</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dueLearningModules.length === 0 && <TableRow>
                        <TableCell colSpan={3} align="center">No Learning Modules Due</TableCell>
                    </TableRow>
                        }
                {createLearningManagerCards(dueLearningModules)}
                </TableBody>
            </Table>
        </TableContainer>
        
        
        </>
    );
}

export default LearningManagersCards