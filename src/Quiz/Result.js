import { Row, Col } from "react-bootstrap";

function Result(props) {

    if (props.correctIdx === props.index && props.correct) {
        return(
            <>
                <Row className="correctResult">
                    <div className="img-col">
                        <img src={require(`../assets/checkmark.png`)} id="check-image" className="text-end" alt="checkmark" />
                    </div>
                    <div 
                        key={props.index} 
                        id={`result-${props.index}`}
                        value={props.rad.name}
                        className="individualResults text-start">
                            {`${props.rad.name}`}
                    </div>
                </Row>    
            </>
        );
    }

    else if (props.correctIdx === props.index && !props.correct) {
        return(
            <>
                <Row className="correctResult  text-center">
                    <div className="img-col">
                        <img src={require(`../assets/x-mark.png`)} id="check-image" className="" alt="checkmark" />
                    </div>
                    <div 
                        key={props.index} 
                        id={`result-${props.index}`}
                        value={props.rad.name}
                        className="individualResults text-start">
                            {`${props.rad.name}`}
                    </div>
                </Row>    
            </>
        );
    }
    else {
        return(
            <>
                <div 
                    key={props.index} 
                    id={`result-${props.index}`}
                    value={props.rad.name}
                    className="text-center"
                    >
                        {`${props.rad.name}`}
                </div>       
            </>
        );
    }
}

export default Result