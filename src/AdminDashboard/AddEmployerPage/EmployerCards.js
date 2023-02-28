import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, Typography } from '@mui/material';
import EmployerCard from './EmployerCard';

/**
 * Returns Panels of the Employers Cards 
 * @returns 
 */
const EmployersCards = () => {
  const [employers, setEmployers] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: {
          the_query: `SELECT * FROM CompanyAdmins LEFT JOIN Users ON CompanyAdmins.UserID = Users.userid`,
        },
      })
      .then((response) => {
        setEmployers(response.data);
      })
      .catch((error) => console.error(`Error ${error}`));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
        params: { the_query: `SELECT * FROM Companies` },
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => console.error(`Error ${error}`));
  }, []);

  /**
   * Create directory cards from modules
   * @param {modules} to create cards for
   * @param {max_length} to limit max card number created
   */
  function createEmployerCards(maxLength = -1) {
    const objs = [];
    let size = 0;
    for (let index in employers) {
      if (size === maxLength) {
        break;
      }
      var employer = employers[index];
      objs.push(
        <EmployerCard
          companyNames={companies}
          email={employer.email}
          name={employer.username}
          company={employer.CompanyID}
          userId={employer.UserID}
          companyId={employer.CompanyId}
          status={employer.active}
        />
      );
      size += 1;
    }
    return objs;
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Employer List
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">
                  <b>Employer Email</b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">
                  <b>Employer Username</b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">
                  <b>Employer Company</b>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">
                  <b>Employer Status</b>
                </Typography>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Card>
        </Grid>
        {createEmployerCards(employers)}
      </Grid>
    </Container>
  );
};

export default EmployersCards;
