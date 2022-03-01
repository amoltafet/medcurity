import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import './ConfirmationPopup.css'


const ConfirmationPopup = props => {
    function callConfirmAndToggle(confirmFunction, confirmFunctionArguments, toggleFunction) {
        confirmFunction(confirmFunctionArguments[0], confirmFunctionArguments[1]);
        toggleFunction();
        
    }


    return (
      <div className="confirmation-popup-box">

        
        {props.content}
        <ButtonGroup>
        <Button className="EmployeeInRowButton uvs-right" 
            variant="success" 
            onClick={() => callConfirmAndToggle(props.confirmFunction, props.confirmFunctionArguments, props.toggleCall)}> 
            Confirm 
        </Button>
        <Button className="EmployeeInRowButton uvs-right" 
        variant="danger" 
        onClick={props.toggleCall}> Go Back</Button>
        </ButtonGroup>

      </div>
    );
};

export default ConfirmationPopup;