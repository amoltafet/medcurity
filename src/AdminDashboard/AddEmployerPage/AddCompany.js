import React, { useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are added
 */

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

const AddCompany = () => {
  axios.defaults.withCredentials = true
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [success, setSuccess] = useState(false)

  const addCompany = () => {
    if (company !== '') {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
          params: {
            the_query: `INSERT INTO Companies (name) VALUES ('${company}')`
          }
        })
        .then(response => {
          setSuccess(true)
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch(error => {
          console.error(`Error ${error}`)
          setMessage('Failed to add company.')
        })
    }
  }

  

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ margin: '10px', marginTop: 5 }}>
        <CardContent>
          <Typography variant='h5' component='div' sx={{ paddingBottom: 2 }}>
            Add a New Company
          </Typography>
          <Typography variant='body2' sx={{ paddingBottom: 2 }}>
            Type in a company name to add a new company to the list of available
            companies.
          </Typography>
          <form noValidate autoComplete='off'>
            <TextField
              fullWidth
              id='companyTextBox'
              label='Company Name'
              value={company}
              onChange={e => setCompany(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            {message && (
              <Typography variant='body2' sx={{ color: 'red' }}>
                {message}
              </Typography>
            )}
            {success && (
              <Alert severity='success' sx={{ paddingBottom: 2 }}>
                Company added successfully!
              </Alert>
            )}
            <Button
              variant='contained'
              color='primary'
              onClick={addCompany}
              sx={{ marginTop: 2 }}
            >
              Add Company
            </Button>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}

export default AddCompany
