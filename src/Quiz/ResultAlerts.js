import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts(props) {
  const [show, setShow] = React.useState(props.show);
  return (
    <>
    {show === true &&
        <Stack sx={{ width: '100%', margin: "5px" }} spacing={2}>
        <Alert severity={props.variant} onClose={() => {setShow(false)}}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}  <strong>{props.points}</strong>
      </Alert>
    </Stack> 
    }
    </>

  );
}