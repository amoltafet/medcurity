import Form from 'react-bootstrap/Form'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './EditContent.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MenuBar from '../../MenuBar/MenuBar'
import { FormControlLabel, Checkbox, TextField } from '@material-ui/core'
import { Button, Container, Grid, Typography, Divider } from '@mui/material'
// import env from "react-dotenv";

/**
 * Creates and displays the learning page for each test category.
 * @return { EditQuestion }
 */
const EditQuestion = () => {
  let { slug } = useParams()
  const [content, setContent] = useState([])
  const [matchingContent, setMatchingContent] = useState([])
  const [questionID, setQuestionID] = useState([])
  const [question, setQuestion] = useState([])
  const [solution, setSolution] = useState([])
  const [answer2, setAnswer2] = useState([])
  const [answer3, setAnswer3] = useState([])
  const [answer4, setAnswer4] = useState([])
  const [matchingAnswer1, setMatchingAnswer1] = useState([])
  const [matchingAnswer2, setMatchingAnswer2] = useState([])
  const [matchingAnswer3, setMatchingAnswer3] = useState([])
  const [matchingAnswer4, setMatchingAnswer4] = useState([])
  const [questionType, setQuestionType] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [matchingIsLoading, setMatchingIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [questionAdded, setAdded] = useState(false)
  const [addedType, setAddedType] = useState(null)
  const [updatedContent, setUpdatedContent] = useState([])
  const [toDelete, setToDelete] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch post using the postSlug
  }, [slug])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getMatchingAnswers`, {
        params: { id: slug }
      })
      .then(response => {
        setMatchingContent(Object.values(response.data))
        setMatchingIsLoading(false)
      })
      .catch(error => console.error(`Error ${error}`))

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getModuleQuestions`, {
        params: { id: slug }
      })
      .then(response => {
        setContent(Object.values(response.data))
        setIsLoading(false)
        // console.log(content)
      })
      .catch(error => console.error(`Error ${error}`))
  }, [slug])

  useEffect(() => {
    if (!isLoading && !matchingIsLoading) {
      var questionIDArray = []
      var questionArray = []
      var solutionArray = []
      var answer2Array = []
      var answer3Array = []
      var answer4Array = []
      var matchingAnswer1Array = []
      var matchingAnswer2Array = []
      var matchingAnswer3Array = []
      var matchingAnswer4Array = []
      var questionTypeArray = []
      for (let index in content) {
        let current = content[index]
        questionIDArray.push(current.questionid)
        questionArray.push(current.question)
        solutionArray.push(current.solution)
        answer2Array.push(current.a2)
        answer3Array.push(current.a3)
        answer4Array.push(current.a4)
        questionTypeArray.push(current.type)
        if (current.type === 'match') {
          var maObject = matchingContent.find(
            o => o.matchingquestionid === current.questionid
          )
          matchingAnswer1Array.push(maObject.m1)
          matchingAnswer2Array.push(maObject.m2)
          matchingAnswer3Array.push(maObject.m3)
          matchingAnswer4Array.push(maObject.m4)
        } else {
          matchingAnswer1Array.push(null)
          matchingAnswer2Array.push(null)
          matchingAnswer3Array.push(null)
          matchingAnswer4Array.push(null)
        }
      }
      setQuestionID(questionIDArray)
      setQuestion(questionArray)
      setSolution(solutionArray)
      setAnswer2(answer2Array)
      setAnswer3(answer3Array)
      setAnswer4(answer4Array)
      setMatchingAnswer1(matchingAnswer1Array)
      setMatchingAnswer2(matchingAnswer2Array)
      setMatchingAnswer3(matchingAnswer3Array)
      setMatchingAnswer4(matchingAnswer4Array)
      setQuestionType(questionTypeArray)
      setIsLoading2(false)
    }
  }, [isLoading, matchingIsLoading, content, matchingContent])

  useEffect(() => {
    if (isSubmitted) {
      var updatedQuestionIDArray = []
      for (let index in updatedContent) {
        updatedQuestionIDArray.push(updatedContent[index].questionid)
      }
      insertNewMatchingAnswers(updatedQuestionIDArray)
    }
  }, [isSubmitted, updatedContent])

  useEffect(() => {
    if (questionAdded && !isLoading2) {
      // console.log("Adding question", questionAdded)
      var questionIDArray = questionID
      var questionArray = question
      var solutionArray = solution
      var answer2Array = answer2
      var answer3Array = answer3
      var answer4Array = answer4
      var matchingAnswer1Array = matchingAnswer1
      var matchingAnswer2Array = matchingAnswer2
      var matchingAnswer3Array = matchingAnswer3
      var matchingAnswer4Array = matchingAnswer4
      var questionTypeArray = questionType

      questionIDArray.push(null)
      questionArray.push('')
      solutionArray.push('')
      if (addedType !== 'fill') {
        answer2Array.push('')
        answer3Array.push('')
        answer4Array.push('')
      } else {
        answer2Array.push(null)
        answer3Array.push(null)
        answer4Array.push(null)
      }
      if (addedType !== 'match') {
        matchingAnswer1Array.push(null)
        matchingAnswer2Array.push(null)
        matchingAnswer3Array.push(null)
        matchingAnswer4Array.push(null)
      } else {
        matchingAnswer1Array.push('')
        matchingAnswer2Array.push('')
        matchingAnswer3Array.push('')
        matchingAnswer4Array.push('')
      }
      questionTypeArray.push(addedType)

      setQuestionID(questionIDArray)
      setQuestion(questionArray)
      setSolution(solutionArray)
      setAnswer2(answer2Array)
      setAnswer3(answer3Array)
      setAnswer4(answer4Array)
      setMatchingAnswer1(matchingAnswer1Array)
      setMatchingAnswer2(matchingAnswer2Array)
      setMatchingAnswer3(matchingAnswer3Array)
      setMatchingAnswer4(matchingAnswer4Array)
      setQuestionType(questionTypeArray)
    }
  }, [questionAdded, question, solution, answer2, answer3, answer4, isLoading2])

  useEffect(() => {
    if (questionAdded) {
      setAdded(false)
      // console.log("changing boolean", questionAdded)
    } else {
      // console.log("Hello from added", questionAdded)
    }
  }, [questionAdded])

  function submitData () {
    // UPDATING EXISTING QUESTIONS
    for (var i = 0; i < content.length; i++) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
          params: {
            the_query: `UPDATE Questions SET question = '${question[i]}', 
            solution = '${solution[i]}', a2 = '${answer2[i]}', a3 = '${answer3[i]}', a4 = '${answer4[i]}' 
            WHERE questionid = '${questionID[i]}'`
          }
        })
        .then(response => {
          // console.log(response)
        })
        .catch(error => console.error(`Error ${error}`))

      if (questionType[i] === 'match') {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
            params: {
              the_query: `UPDATE MatchingAnswers SET m1 = '${matchingAnswer1[i]}', 
                m2 = '${matchingAnswer2[i]}', m3 = '${matchingAnswer3[i]}', m4 = '${matchingAnswer4[i]}' 
                WHERE matchingquestionid = '${questionID[i]}'`
            }
          })
          .then(response => {
            // console.log(response)
          })
          .catch(error => console.error(`Error ${error}`))
      }
    }

    // DELETE EXISTING QUESTIONS
    for (i = 0; i < content.length; i++) {
      if (toDelete.includes(i)) {
        if (questionType[i] === 'match') {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
              params: {
                the_query: `DELETE FROM MatchingAnswers 
                    WHERE matchingquestionid = '${questionID[i]}'`
              }
            })
            .then(response => {
              // console.log(response)
            })
            .catch(error => console.error(`Error ${error}`))
        }

        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
            params: {
              the_query: `DELETE FROM Questions 
                WHERE questionid = '${questionID[i]}'`
            }
          })
          .then(response => {
            // console.log(response)
          })
          .catch(error => console.error(`Error ${error}`))
      }
    }

    // ADDING NEW QUESTIONS
    for (i = content.length; i < question.length; i++) {
      if (toDelete.includes(i) === false) {
        // "DELETE" NEWLY ADDED QUESTIONS BY PREVENTING THEM FROM BEING ADDED IN THE FIRST PLACE
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
            params: {
              the_query: `INSERT INTO Questions (question, solution, a2, a3, a4, type, module) 
                VALUES ('${question[i]}', '${solution[i]}', '${answer2[i]}', '${answer3[i]}', '${answer4[i]}', '${questionType[i]}', '${slug}')`
            }
          })
          .then(response => {
            // console.log(response)
          })
          .catch(error => console.error(`Error ${error}`))
      }
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getModuleQuestions`, {
        params: { id: slug }
      })
      .then(response => {
        setUpdatedContent(Object.values(response.data))
        setIsSubmitted(true)
      })
      .catch(error => console.error(`Error ${error}`))
  }

  function insertNewMatchingAnswers (updatedQuestionIDs) {
    for (var i = content.length; i < question.length; i++) {
      if (questionType[i] === 'match' && toDelete.includes(i) === false) {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
            params: {
              the_query: `INSERT INTO MatchingAnswers (matchingquestionid, m1, m2, m3, m4, module) 
                VALUES ('${updatedQuestionIDs[i]}', '${matchingAnswer1[i]}', '${matchingAnswer2[i]}', '${matchingAnswer3[i]}', '${matchingAnswer4[i]}', '${slug}')`
            }
          })
          .then(response => {
            // console.log(response)
          })
          .catch(error => console.error(`Error ${error}`))
      }
    }

    navigate('/admin-content')
  }

  const handleCheckboxToggle = ({ target: { value } }) => {
    var deleteArray = toDelete
    if (deleteArray.includes(parseInt(value))) {
      deleteArray.splice(deleteArray.indexOf(parseInt(value)), 1)
    } else {
      deleteArray.push(parseInt(value))
    }
    setToDelete(deleteArray)
  }

  function addMCQuestion () {
    setAddedType('mc')
    setAdded(true)
  }

  function addFillQuestion () {
    setAddedType('fill')
    setAdded(true)
  }

  function addMatchQuestion () {
    setAddedType('match')
    setAdded(true)
  }

  var ModuleContent = question.map((q, idx) => {
    // console.log("reloading")
    if (questionType[idx] === 'mc') {
      return (
        <>
          <div>
            <form className='text-center contentForm' style={{ width: '100%' }}>
              <h3 style={{ marginBottom: '1rem', color: '#4a4a4a' }}>
                Question {idx + 1} &#40;Multiple Choice&#41;
              </h3>
              <div className='d-flex justify-content-center mb-3'>
                <Form.Check
                  type='checkbox'
                  id={`delete-question-${idx}`}
                  label='Delete Question'
                  value={idx}
                  onChange={handleCheckboxToggle}
                  style={{ marginRight: '1rem' }}
                />
                <TextField
                  label='Question:'
                  variant='outlined'
                  multiline
                  rows={3}
                  defaultValue={question[idx]}
                  style={{ marginBottom: '1rem', backgroundColor: '#f0fcff' }}
                  onChange={e => {
                    let x = question
                    x[idx] = e.target.value
                    setQuestion(x)
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: { paddingTop: '8px' }
                  }}
                />
              </div>
              <TextField
                label='Solution:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={solution[idx]}
                onChange={e => {
                  let x = solution
                  x[idx] = e.target.value
                  setSolution(x)
                }}
                style={{ marginBottom: '1rem', backgroundColor: '#f0fff4' }}
                InputLabelProps={{ shrink: true, style: { paddingTop: '8px' },  }}
              />
              <TextField
                label='Answer 2:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={answer2[idx]}
                onChange={e => {
                  let x = answer2
                  x[idx] = e.target.value
                  setAnswer2(x)
                }}
                style={{ marginBottom: '1rem', backgroundColor: '#fff0f2' }}
                InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
              />
              <TextField
                label='Answer 3:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={answer3[idx]}
                onChange={e => {
                  let x = answer3
                  x[idx] = e.target.value
                  setAnswer3(x)
                }}
                style={{ marginBottom: '1rem', backgroundColor: '#fff0f2' }}
                InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
              />
              <TextField
                label='Answer 4:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={answer4[idx]}
                onChange={e => {
                  let x = answer4
                  x[idx] = e.target.value
                  setAnswer4(x)
                }}
                style={{ marginBottom: '1rem', backgroundColor: '#fff0f2' }}
                InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
              />
            </form>
          </div>
        </>
      )
    } else if (questionType[idx] === 'fill') {
      return (
        <>
          <form className='text-center contentForm' style={{ width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', color: '#4a4a4a' }}>
              Question {idx + 1} &#40;Fill in the Blank&#41;
            </h3>
            <div className='d-flex justify-content-center mb-3'>
              <Form.Check
                type='checkbox'
                id={`delete-question-${idx}`}
                label='Delete Question'
                value={idx}
                onChange={handleCheckboxToggle}
                style={{ marginRight: '1rem' }}
              />
              <TextField
                label='Question:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={question[idx]}
                style={{ marginBottom: '1rem', backgroundColor: '#f0fcff' }}
                onChange={e => {
                  let x = question
                  x[idx] = e.target.value
                  setQuestion(x)
                }}
                InputLabelProps={{
                  shrink: true,
                  style: { paddingTop: '8px' }
                }}
              />
            </div>
            <TextField
              label='Solution:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={solution[idx]}
              onChange={e => {
                let x = solution
                x[idx] = e.target.value.toLowerCase()
                setSolution(x)
              }}
              style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#f0fff4' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
          </form>
        </>
      )
    } else if (questionType[idx] === 'match') {
      return (
        <>
          <form className='text-center contentForm' style={{ width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', color: '#4a4a4a' }}>
              Question {idx + 1} &#40;Matching&#41;
            </h3>
            <div className='d-flex justify-content-center mb-3'>
              <Form.Check
                type='checkbox'
                id={`delete-question-${idx}`}
                label='Delete Question'
                value={idx}
                onChange={handleCheckboxToggle}
                style={{ marginRight: '1rem' }}
              />
              <TextField
                label='Question:'
                variant='outlined'
                multiline
                rows={3}
                defaultValue={question[idx]}
                style={{ marginBottom: '1rem', backgroundColor: '#f0fcff' }}
                onChange={e => {
                  let x = question
                  x[idx] = e.target.value
                  setQuestion(x)
                }}
                InputLabelProps={{
                  shrink: true,
                  style: { paddingTop: '8px' }
                }}
              />
            </div>
            <TextField
              label='Value 1:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={solution[idx]}
              onChange={e => {
                let x = solution
                x[idx] = e.target.value
                setSolution(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Match to Value 1:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={matchingAnswer1[idx]}
              onChange={e => {
                let x = matchingAnswer1
                x[idx] = e.target.value
                setMatchingAnswer1(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Value 2:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={answer2[idx]}
              onChange={e => {
                let x = answer2
                x[idx] = e.target.value
                setAnswer2(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Match to Value 2:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={matchingAnswer2[idx]}
              onChange={e => {
                let x = matchingAnswer2
                x[idx] = e.target.value
                setMatchingAnswer2(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Value 3:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={answer3[idx]}
              onChange={e => {
                let x = answer3
                x[idx] = e.target.value
                setAnswer3(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Match to Value 3:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={matchingAnswer3[idx]}
              onChange={e => {
                let x = matchingAnswer3
                x[idx] = e.target.value
                setMatchingAnswer3(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Value 4:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={answer4[idx]}
              onChange={e => {
                let x = answer4
                x[idx] = e.target.value
                setAnswer4(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
            <TextField
              label='Match to Value 4:'
              variant='outlined'
              multiline
              rows={3}
              defaultValue={matchingAnswer4[idx]}
              onChange={e => {
                let x = matchingAnswer4
                x[idx] = e.target.value
                setMatchingAnswer4(x)
              }}
              style={{ width: '100%', marginBottom: '1rem' }}
              InputLabelProps={{ shrink: true, style: { paddingTop: '8px' } }}
            />
          </form>
        </>
      )
    }
    return (
      <>
        <p>An error has occurred...</p>
      </>
    )
  })

  return (
    <>
      <MenuBar />
      <Container maxWidth='md'>
        <Typography variant='h4' align='center' sx={{ my: 4 }}>
          Edit Module Questions
        </Typography>
        <div className='EditQuestionBg img-fluid'>
          {ModuleContent}
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mb: 2 }}
                onClick={addMCQuestion}
              >
                Add Multiple Choice Question
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mb: 2 }}
                onClick={addFillQuestion}
              >
                Add Fill-in-the-Blank Question
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mb: 2 }}
                onClick={addMatchQuestion}
              >
                Add Matching Question
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={submitData}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default EditQuestion
