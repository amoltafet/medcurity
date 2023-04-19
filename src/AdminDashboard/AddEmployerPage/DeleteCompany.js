import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles'

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are Deleteed
 */

const DeleteCompany = () => {
  axios.defaults.withCredentials = true

  const [company, setCompany] = useState('')
  const [companies, setCompanies] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0072C6'
      },
      secondary: {
        main: '#FFC72C'
      }
    }
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: { the_query: `SELECT * FROM Companies ` }
      })
      .then(response => {
        setCompanies(response.data)
      })
      .catch(error => console.error(`Error ${error}`))
  }, [])

  const deleteCompany = () => {
    if (company !== '') {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
          params: {
            the_query: `DELETE FROM Companies WHERE companyid = '${company}'`
          }
        })
        .then(response => {
          setSuccessMessage('Company successfully deleted')
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch(error => console.error(`Error ${error}`))
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
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          p: 2,
          backgroundColor: '#FFFFFF',
          margin: '10px',
          marginTop: 5
        }}
      >
        <Typography variant='h5' component='div'>
          Delete a Company
        </Typography>
        <Typography variant='body1' sx={{ marginBottom: 3 }}>
          Select a company name to delete a company from the list of available
          companies.
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id='company-select-label'>Company</InputLabel>
          <Select
            labelId='company-select-label'
            id='company-select'
            value={company}
            label='Company'
            onChange={e => setCompany(e.target.value)}
          >
            {companies.map(item => (
              <MenuItem key={item.companyid} value={item.companyid}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant='contained' color='error' onClick={deleteCompany}>
          Delete Company
        </Button>
        {successMessage && (
          <Alert severity='success' sx={{ marginTop: 3 }}>
            {successMessage}
          </Alert>
        )}
      </Card>
    </ThemeProvider>
  )
}

export default DeleteCompany
