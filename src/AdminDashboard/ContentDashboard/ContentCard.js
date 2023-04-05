import React from 'react'
import { Card, Grid, Button, Popover } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import axios from 'axios'
// import env from "react-dotenv";

/**
 * Panel for Module cards
 * @param {} props
 * @returns
 */
const ContentCard = props => {
  /**
   * Removes a user from the selected company
   * @param {int} userId
   */
  function removeModule () {
    // console.log("Removing LearningModule from company");
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: {
          the_query: `DELETE FROM Questions WHERE module = '${props.moduleId}'`
        }
      })
      .then(response => {
        // // console.log("Removing Questions for", props.moduleId)
      })
      .catch(error => console.error(`Error ${error}`))

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: {
          the_query: `DELETE FROM LearningModules WHERE ID = '${props.moduleId}'`
        }
      })
      .then(response => {
        // // console.log("Removing Questions for", props.moduleId)
      })
      .catch(error => console.error(`Error ${error}`))
  }

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
        <Grid container className='userRow'>
          <Grid item xs={3} md={3} lg={3}>
            <Box
              className='ContentCardValues'
              id='content-name'
              sx={{ display: 'flex', alignItems: 'center' }}
              padding-left='10px'
            >
              {props.learningModuleName}
            </Box>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Button
              className='ContentInRowButton uvs-right'
              size='small'
              variant='contained'
              href={`/edit-content/${props.moduleId}`}
            >
              Edit Content
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Button
              className='ContentInRowButton uvs-right'
              size='small'
              variant='contained'
              href={`/edit-questions/${props.moduleId}`}
            >
              Add Questions
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Popover
              trigger='click'
              onClose={() => {}}
              className='uvs-left'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              PaperProps={{ sx: { p: 2 } }}
              disablePortal
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div>
                  Please confirm that you want to remove the module '
                  {props.learningModuleName}' from your assigned list of
                  modules:
                </div>
                <Button
                  className='EmployeeInRowButton_confirm text-center uvs-right'
                  variant='contained'
                  color='success'
                  onClick={() => removeModule(props.moduleId)}
                  href='/admin-content'
                  sx={{ mt: 2 }}
                >
                  Confirm
                </Button>
              </Box>
              <Button
                className='ContentInRowButton_remove uvs-right'
                size='small'
                variant='contained'
                color='error'
              >
                Remove Module
              </Button>
            </Popover>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default ContentCard
