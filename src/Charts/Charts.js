import React from 'react';
import MenuBar from '../MenuBar/MenuBar';
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
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
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

function Charts() {
  return (
  <>
    <MenuBar />
    <Grid container spacing={3} sx={{
        padding: 5,
    }}>

        <Grid item xs={12}>
            <Paper elevation={2} >
                <MedcurityBarChart />
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
    
  </>)
}


const MedcurityBarChart = () => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average Time to Complete',
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
    return <Bar options={options} data={data} width='100%' height='10px'/>;
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
    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Completions by Module',
            },
          },
    }

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Completions',
            data: [12, 19, 3, 5, 2, 3],
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

export default Charts;
