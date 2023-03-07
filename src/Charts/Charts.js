import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../MenuBar/MenuBar';
import InvalidPage from '../InvalidPage/InvalidPage'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js/auto';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import './Charts.css';
//https://react-chartjs-2.js.org/examples/horizontal-bar-chart

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [companyID, setCompanyID] = useState(null);
  const [employeeActivity, setEmployeeActivity] = useState([]);
  const [moduleCounts, setModuleCounts] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
    if (response.data.user)
    {
        setCurrentUser(response.data.user[0]);
        setLoaded(true);
    }
    else
    {
        setCurrentUser(null)
    }
    }).catch(error => console.error(`Error ${error}`));
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (currentUser.companyAdminID) {
        setCompanyID(currentUser.companyAdminID);
      }
    }
  }, [isLoaded, currentUser]);

  // querys for employee activity
	useEffect(() => {
    if (companyID) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/stats/getEmployeeActivity`, { params: { companyid: companyID
        } }).then((response) => {
          if (response.data.success) {
            setEmployeeActivity(response.data.result);
          }
          else {
            console.log("Error:", response.data.error);
          }
        }).catch((error) => console.log("Error:", error));
    }
}, [companyID]);

// querys for module counts in company
useEffect(() => {
    if (companyID) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/stats/getModuleCounts`, { params: { companyid: companyID
        } }).then((response) => {
          if (response.data.success) {
            let result = {
              data: response.data.result,
              cutoff: response.data.cutoff,
            }
            setModuleCounts(result);
          }
          else {
            console.log("Error:", response.data.error)
          }
        }).catch((error) => console.log("Error:", error));
    }
}, [companyID]);

  const MedcurityLineChart = () => {
    let weeks = [];
    let counts = [];

    for (let i = employeeActivity.length - 1; i >= 0; i--) {
      weeks.push(employeeActivity[i].range);
      counts.push(employeeActivity[i].count);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Employee Activity',
          },
        
        },
    
      };
      
    const labels = weeks;
    const data = {
        labels,
        datasets: [
          {
            label: 'Employee Module Attempts',
            data: counts,
            backgroundColor: 'rgb(32, 42, 68)',
          },
        ],
      };

    return <Line options={options} data={data} width='100%'/>;
  }

  const MedcurityHorizontalBarChart = () => {
      const options = {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Max Time to Complete',
            },
          },
        };
        
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        
      const data = {
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: [28, 48, 40, 19, 86, 27, 90],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        };
      return <Bar options={options} data={data} />;
  }

  const MedcurityPieChart = () => {
    if (moduleCounts) {
      let labels = [];
      let counts = [];
      let cutoff = moduleCounts.cutoff;
      cutoff = new Date(cutoff);
      
      let cutoffStr = (cutoff.getMonth() + 1) + '/' + cutoff.getDate() + '/' + cutoff.getFullYear();

      for (let i = 0; i < moduleCounts.data.length; i++) {
        labels.push(moduleCounts.data[i].title);
        counts.push(moduleCounts.data[i].count);
      }
    
      const options = {
          responsive: true,
          plugins: {
              legend: {
                position: 'left',
              },
              title: {
                display: true,
                text: 'Module Attempts (Since ' + cutoffStr + ')',
              },
            },
      }

      const data = {
          labels: labels,
          datasets: [
            {
              label: 'Number of Attempts',
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            
          ],
        };

      return <Pie data={data} options={options} 
        width='50%'
          height='50%'
      />;
    }
    else {
      return <></>;
    }
  }

  const MedcurityModulePerformance = () => {
      return (
          <>
              <Typography variant='h6'>Module Performance</Typography>
              <Grid container spacing={3}>
                  <Grid item xs={6}>
                      <Paper elevation={2}>
                          <Typography variant='h6'>Avg Time to Complete</Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper elevation={2}>
                          <Typography variant='h6'>Avg Time to Complete</Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper elevation={2}>
                          <Typography variant='h6'>Avg Time to Complete</Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper elevation={2}>
                          <Typography variant='h6'>Avg Time to Complete</Typography>
                      </Paper>
                  </Grid>
              </Grid>    
          </>
      );
  }
  
  if (companyID)
  {
      return (
        <>
          <MenuBar />
          <Grid container spacing={3} sx={{
              padding: 5,
          }}>
      
              <Grid item xs={12}>
                  <Paper className="linechart" elevation={2} >
                      <MedcurityLineChart />
                  </Paper>
              </Grid>
              <Grid item xs={6}>
              <MedcurityPieChart />
      
              </Grid>
              <Grid item xs={6}>
                <MedcurityHorizontalBarChart />
              </Grid>
              <Grid item xs={6}>
                  <MedcurityModulePerformance />
              </Grid>
          </Grid> 
        </>);
  } else {
        return (
          <>
            <InvalidPage 
              redirectPage={'/'} 
              reason={"You need to be logged in to view company stats."}
              btnMessage={"Go Back"}>
            </InvalidPage>
          </>
        );
  }
}

export default Charts;
