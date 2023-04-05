import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import MenuBar from '../../MenuBar/MenuBar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(8)
  },
  input: {
    margin: theme.spacing(1),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: '100%'
  }
}))

const EditContent = () => {
  const classes = useStyles()
  let { slug } = useParams()
  const [currentUser, setCurrentUser] = useState([])
  const [content, setContent] = useState([])
  const [title, setTitle] = useState([])
  const [description, setDescription] = useState([])
  const [subtitle, setSubtitle] = useState([])
  const [timeCutoff, setTimeCutoff] = useState([])
  const [timeBonusCutoff, setTimeBonusCutoff] = useState([])
  const [badgeCutoff, setBadgeCutoff] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch post using the postSlug
  }, [slug])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/login`)
      .then(response => {
        setCurrentUser(response.data.user[0])
      })
      .catch(error => console.error(`Error ${error}`))
  }, [])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getModuleInfo`, {
        params: { id: slug }
      })
      .then(response => {
        setContent(Object.values(response.data))
        setIsLoading(false)
      })
      .catch(error => console.error(`Error ${error}`))
  }, [slug])

  useEffect(() => {
    if (!isLoading) {
      let module = content[0]
      setTitle(module.Title)
      setSubtitle(module.Subtitle)
      setDescription(module.Description)
      setTimeCutoff(module.timecutoff)
      setTimeBonusCutoff(module.timebonuscutoff)
      setBadgeCutoff(module.badgecutoff)
    }
  }, [isLoading])

  function submitData () {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: {
          the_query: `UPDATE LearningModules SET Title = '${title}', 
      Subtitle = '${subtitle}', Description = '${description}', timecutoff = '${timeCutoff}', timebonuscutoff = '${timeBonusCutoff}', 
      badgecutoff = '${badgeCutoff}' WHERE ID = '${slug}'`
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(`Error ${error}`))
    navigate('/admin-content')
  }

  const ModuleContent = content.map(module => {
    return (
        <>
        <MenuBar></MenuBar>
          <h1 className='text-center moduleName'>
            Learning Modules: {module.Title} Module
          </h1>
          <form className={classes.form}>
            <TextField
              label='Title'
              variant='outlined'
              className={classes.input}
              defaultValue={module.Title}
              onChange={e => {
                setTitle(e.target.value)
              }}
              style={{ width: "100%" }}
            />
            <TextField
              label='Subtitle'
              variant='outlined'
              className={classes.input}
              defaultValue={module.Subtitle}
              onChange={e => {
                setSubtitle(e.target.value)
              }}
              style={{ width: "100%" }}
            />
            <TextField
              label='Description'
              variant='outlined'
              className={classes.input}
              defaultValue={module.Description}
              onChange={e => {
                setDescription(e.target.value)
              }}
              multiline
              rows={4}
              style={{ width: "100%" }}
            />
            <TextField
              label='Time Cutoff'
              variant='outlined'
              className={classes.input}
              defaultValue={module.timecutoff}
              onChange={e => {
                setTimeCutoff(e.target.value)
              }}
              style={{ width: "100%" }}
            />
            <TextField
              label='Time Bonus Cutoff'
              variant='outlined'
              className={classes.input}
              defaultValue={module.timebonuscutoff}
              onChange={e => {
                setTimeBonusCutoff(e.target.value)
              }}
              style={{ width: "100%" }}
            />
            <TextField
              label='Badge Cutoff'
              variant='outlined'
              className={classes.input}
              defaultValue={module.badgecutoff}
              onChange={e => {
                setBadgeCutoff(e.target.value)
              }}
              style={{ width: "100%" }}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={submitData}
            >
              Update Content
            </Button>
          </form>
        </>
      )
      
  })

  return <div>{ModuleContent}</div>
}

export default EditContent
