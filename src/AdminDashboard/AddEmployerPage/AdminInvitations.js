import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText
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
  const [userCompany, setUserCompany] = useState(1)

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
          companyid: userCompany
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
          <Grid item xs={12} lg={7}>
            <TextField
              fullWidth
              type='email'
              id='emailTextBox'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              variant='outlined'
              margin='normal'
            />
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
          <Grid item xs={12} lg={5}>
            <Typography variant='subtitle1' gutterBottom>
              Company List:
            </Typography>
            <List sx={{ backgroundColor: '#f5f5f5', borderRadius: '16px' }}>
              {createListItems()}
            </List>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default AdminInvitations
