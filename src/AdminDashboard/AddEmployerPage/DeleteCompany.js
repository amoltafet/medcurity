import React from 'react';
import { Form , Card, Button, Container} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './AddCompany.css'
import axios from 'axios';
import env from "react-dotenv";

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are Deleteed
 */
const DeleteCompany = () => {
    axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `SELECT * FROM Companies ` } }).then((response) => {
            setCompanies(response.data)
            }).catch(error => console.error(`Error ${error}`));
        },[])


    const deleteCompany = () =>
    {
        if(company != "") {
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `DELETE FROM Companies WHERE companyid = '${company}'` } }).then((response) => {
            }).catch(error => console.error(`Error ${error}`));
        }
    }

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    // const invite = () => {
    //     // console.log('INVITING', email)
    //     axios.post("${process.env.REACT_APP_BASE_URL}/users/register",
    //     { 
    //     email: email,
    //     }).then((response) => 
    //     {
    //     // console.log("response.data =", response.data)
    //     if (response.data === true)
    //     {
    //         // console.log("A new invitation!")
    //         navigate('/admin-dash');
    //     }
    //     else if (response.data === false)
    //     {
    //         // console.log("Already has account!")
    //         setMessage('This email is already associated with an account! Please try a different email.')
    //     }
    //     });
    // };

    const login = () => {
        navigate('/');
    };

    function createDropDownOptions() {
        const dropdownList = [];
        for (let index in companies) {
            let item = companies[index];
            dropdownList.push(<option className="companyList" value={item.companyid}>{item.name}</option>); 
        }
        return dropdownList;
    }
  
    return (
        <Container className="EmployerInviteRequestCard uvs-right">

                
            <h2 className="registerHeader">Delete a Company</h2>
            <div className="InviteSubtitle font">Type in a company name to delete a company from the list of available companies. </div>
            <select id="company-list" size={5}  multiple={false}
                onChange={ (e) => 
                {
                    setCompany(e.target.value)
                    // console.log(e.target.value);
                }}>
                {createDropDownOptions()}
            </select>
            <Button className="deleteButton" variant="secondary" type="button" href='/admin-dash' onClick={deleteCompany}>Delete Company</Button>
        </Container>
    );
}

export default DeleteCompany;