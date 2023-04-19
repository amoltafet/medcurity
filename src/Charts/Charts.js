import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../MenuBar/MenuBar';
import InvalidPage from '../InvalidPage/InvalidPage'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import SideBar from '../MenuBar/SideBar';
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [moduleStats, setModuleStats] = useState(null);
  const [moduleHistory, setModuleHistory] = useState(null);

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

// querys for module stats in company
useEffect(() => {
  if (companyID) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/stats/getModuleStats`, { params: { companyid: companyID
      } }).then((response) => {
        if (response.data.success) {
          let result = response.data.result;
          setModuleStats(result);
        }
        else {
          console.log("Error:", response.data.error)
        }
      }).catch((error) => console.log("Error:", error));
  }
}, [companyID]);

// querys for module history for company
useEffect(() => {
  if (companyID) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/stats/getModuleHistory`, { params: { companyid: companyID
      } }).then((response) => {
        if (response.data.success) {
          let result = response.data.result;
          setModuleHistory(result);
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

  const MedcurityPercentageBarChart = () => {
    if (moduleStats) {
      let labels = [];
      let percentages = [];

      for (let i = 0; i < moduleStats.length; i++) {
        labels.push(moduleStats[i].title);
        percentages.push(moduleStats[i].pct * 100);
      }

      const options = {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  count: 11,
                  stepSize: 10
                }
            }
          },
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Average Percentage',
            },
          },
      };
        
      const data = {
          labels,
          datasets: [
            {
              label: 'Average Percentage',
              data: percentages,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        };
        return <Bar options={options} data={data} />;
      }
      else {
        return <></>;
      }
  }

  const MedcurityHistory = () => {
    let tableData = [];

    const tableColumns = [
      { headerName: 'Module', field: 'module', align: 'left' },
      { headerName: 'Date Assigned', field: 'assigned' },
      { headerName: 'Date Removed', field: 'removed' },
      { headerName: 'Employees Completed', field: 'employees', align: 'right' }
    ];
    
    if (moduleHistory) {
      for (let i = 0; i < moduleHistory.length; i++) {
        let endDate = moduleHistory[i].dateRemoved;
        if (endDate) {
          endDate = new Date(endDate);
          let month = endDate.getUTCMonth() + 1; //months from 1-12
          let day = endDate.getUTCDate();
          let year = endDate.getUTCFullYear();
          endDate = month + "/" + day + "/" + year;
        } else {
          endDate = "Active";
        }
        let startDate = moduleHistory[i].dateAssigned;
        startDate = new Date(startDate);
        let month = startDate.getUTCMonth() + 1; //months from 1-12
        let day = startDate.getUTCDate();
        let year = startDate.getUTCFullYear();
        startDate = month + "/" + day + "/" + year;
    
        tableData.push({ module: moduleHistory[i].title, assigned: startDate, removed: endDate, employees: moduleHistory[i].employees });
      }
    }
    
    return (
      <TableContainer component={Paper} style={{ height: '300px' }}>
        <Table aria-label="nice table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={row.module} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                  {row.module}
                </TableCell>
                <TableCell align="left">{row.assigned}</TableCell>
                <TableCell align="left">{row.removed}</TableCell>
                <TableCell align="right">{row.employees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const MedcurityTimeBarChart = () => {
    if (moduleStats) {
      let labels = [];
      let times = [];

      for (let i = 0; i < moduleStats.length; i++) {
        labels.push(moduleStats[i].title);
        times.push(moduleStats[i].time);
      }

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
              display: false
            },
            title: {
              display: true,
              text: 'Average Time To Complete',
            },
          },
      };
        
      const data = {
          labels,
          datasets: [
            {
              label: 'Average Time (Seconds)',
              data: times,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
          ],
        };
        return <Bar options={options} data={data} />;
      }
      else {
        return <></>;
      }
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
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
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
  
  if (companyID)
  {
      return (
        <Grid container>
        <div>
          
        </div>
        <div>
        <MenuBar></MenuBar>
          <Grid container spacing={3} sx={{
              padding: 5,
          }}>
      
              <Grid item xs={12} >
                  <Paper className="linechart" elevation={2} >
                      <MedcurityLineChart />
                  </Paper>
              </Grid>
              <Grid item xs={6}>
                <MedcurityPercentageBarChart />
              </Grid>
              <Grid item xs={6}>
                <MedcurityTimeBarChart />
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
              <Paper className="piechart" elevation={2} >
                <MedcurityPieChart />
              </Paper>
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={12}>
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
      Historical Assignments
    </AccordionSummary>
    <AccordionDetails>
      <div className="historyTable">
        <MedcurityHistory />
      </div>
    </AccordionDetails>
  </Accordion>
</Grid>
              </Grid>
          </div> 
        </Grid>);
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
