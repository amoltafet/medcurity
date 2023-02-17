import { Row, Col, Image } from "react-bootstrap";
import './Result.css';
import Alert from '@mui/material/Alert';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Result(props) {

    if (props.type === 'mc') {
        if (props.correctIdx === props.index && props.correct) { // user selected correct answer
            return(
                <>
                    
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="success"
                        iconMapping={{
                            success: <CheckCircleOutlineOutlinedIcon fontSize="inherit" />,
                        }}
                        >
                        {`${props.rad.name}`}
                        </Alert>

                </>
            );
        } else if (props.correctIdx === props.index && !props.correct) { // user selected wrong answer
            return(
                <>
                  
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="warning"
                        iconMapping={{
                            warning: <CancelOutlinedIcon fontSize="inherit" />,
                        }} 
                        >
                        {`${props.rad.name}`}
                        </Alert>
                </>
            );
        } else { // user didn't select this answer
            return(
                <>
                    
                    <Alert key={props.index}   id = {`result-${props.index}`}  severity="info"
                        iconMapping={{
                            info: <RadioButtonUncheckedIcon fontSize="inherit" />,
                        }}
                        >
                        {`${props.rad.name}`}
                        </Alert>
                </>
            );
        }
    } else if (props.type === 'fill') {
        if (props.correct) { // user typed in correct answer
            return(
                <>
                    
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="success"
                        iconMapping={{
                            success: <CheckCircleOutlineOutlinedIcon fontSize="inherit" />,
                        }}
                        >
                        {`${props.userFillInAnswer}`}
                        </Alert>
                </>
            );
        } else { // user typed in wrong answer
            
            return(
                <>
                    
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="warning"
                        iconMapping={{
                            warning: <CancelOutlinedIcon fontSize="inherit" />,
                        }}
                        >
                        {`${props.userFillInAnswer}` }
                        </Alert>
                </>
            );
        }
    } else if (props.type === 'match') {
        if (props.correct) {
            return(
                <>
                     
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="success"
                        iconMapping={{
                            success: <CheckCircleOutlineOutlinedIcon fontSize="inherit" />,
                        }}
                        >
                        You matched all four correctly!
                        </Alert>
                        
                </>
            );
        } else {
            return(
                <>
                  
                    <Alert key={props.index} id = {`result-${props.index}`}  severity="warning"
                        iconMapping={{
                            warning: <CancelOutlinedIcon fontSize="inherit" />,
                        }}
                        >
                        You created {props.numberCorrectMatches} correct matches.
                        </Alert>

                    
                </>
            );
        }
    }
    return(
        <>
            <p>An error has occurred...</p>
        </>
    );

}

export default Result