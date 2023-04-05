import React from 'react';
import { Container, Card, CardContent, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from "react";
import axios from 'axios';

const ContentsCards = (props) => {
    const [learningModules, setLearningModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `SELECT * FROM LearningModules` } }).then((response) => {
            setLearningModules(response.data);
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    const handleChange = (event) => {
        setSelectedModule(event.target.value);
    };

    return (
        <>
            <Container>
                <Card className="Content-container" width={50}>
                    <Grid container xs={12} lg={12}>
                        <Grid item xs={7} lg={10}>
                            <CardContent className="ContentCardHeader" id="content-title">
                                Current Learning Modules
                            </CardContent>
                        </Grid>
                        <Grid item xs={5} lg={2} className="justify-content-right">
                            <Button fullWidth variant="contained" color="secondary" href="/add-content">Add Module</Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="learning-module-select-label">Select Module</InputLabel>
                            <Select
                                labelId="learning-module-select-label"
                                id="learning-module-select"
                                value={selectedModule}
                                onChange={handleChange}
                                label="Select Module"
                            >
                                {learningModules.map((module, index) => (
                                    <MenuItem key={index} value={module.ID}>{module.Title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedModule !== '' && (
                            <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                                <Grid item xs={12} lg={6}>
                                    <Button fullWidth variant="contained" color="primary" href={`/edit-content/${selectedModule}`}>
                                        Edit Content
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <Button fullWidth variant="contained" color="secondary" href={`/edit-questions/${selectedModule}`}>
                                        Add Questions
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default ContentsCards;
