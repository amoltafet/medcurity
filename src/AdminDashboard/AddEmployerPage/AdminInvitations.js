import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert
} from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'


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

const AdminInvitations = () => {
  axios.defaults.withCredentials = true

  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(1)

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

  /**
   * This function creates a new basic user account.
   * First it trys to register a user, then it
   *
   */
  const invite = () => {
    // // console.log('INVITING', email)
    // axios.post("${process.env.REACT_APP_BASE_URL}/users/register",
    // {
    // email: email,
    // }).then((response) =>
    // {
    // // console.log("response.data =", response.data)
    // if (response.data === true)
    // {
    //     // console.log("A new invitation!")
    //     navigate('/admin-dash');
    // }
    // else if (response.data === false)
    // {
    //     // console.log("Already has account!")
    //     setMessage('This email is already associated with an account! Please try a different email.')
    // }
    // });

    // for(var i = 0; i < companies.length; i++) {
    //     if(userCompany === companies[i].companyid) {
    //         let userName = companies[i].name
    //     }
    // }
    // const addCompany = () =>
    // {
    //     axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query: `INSERT INTO Companies (name) VALUES ('${company}')` } }).then((response) => {
    //     // console.log(response)
    //     }).catch(error => console.error(`Error ${error}`));
    //     // console.log("We added")
    // }
    // console.log("Email:", email)
    // console.log("")
    if (email !== '') {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/users/registerCompanyAdmin`, {
          email: email,
          companyid: company
        })
        .then(response => {})
    }
  }

  //   const createListItems = () => {
  //     return companies.map((item) => (
  //       <ListItem key={item.companyid}>
  //         <ListItemText primary={item.name} />
  //       </ListItem>
  //     ));
  //   };

  function createListItems () {
    const dropdownList = []
    for (let index in companies) {
      dropdownList.push(
        <ListItem key={index}>
          <ListItemText primary={companies[index].name} />
        </ListItem>
      )
    }
    return dropdownList
  }

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          p: 2,
          backgroundColor: '#FFFFFF',
          maxWidth: 600,
          margin: 'auto',
          marginTop: 5
        }}
      >
        <Typography variant='h5' gutterBottom>
          Employer Invitations
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Type in an email to create an empty account for a prospective
          Employer. They will be able to register using that email.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={15} lg={16}>
            <TextField
              fullWidth
              type='email'
              id='emailTextBox'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              variant='outlined'
              margin='normal'
            />
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
            <Typography variant='body2' color='error'>
              {message}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={invite}
              href='/admin-dash'
              sx={{ mt: 2 }}
            >
              Invite
            </Button>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default AdminInvitations
