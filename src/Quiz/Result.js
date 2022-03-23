import { Row, Col, Image } from "react-bootstrap";
import './Result.css';

function Result(props) {

    if (props.correctIdx === props.index && props.correct) {
        return(
            <>
                <Row > 
                    <Col xs lg="1"  className="justify-content-right">
                        <Image src="/checkmark.png" className="checkmarkImage"  alt="checkmark" />
                    </Col >
                    <Col xs lg="8"  className="justify-content-left">
                        <div
                            key={props.index} 
                            id={`result-${props.index}`}
                            value={props.rad.name}
                            className="correctResults text-center">
                                {`${props.rad.name}`}
                        </div>
                    </Col>
                </Row>    
            </>
        );
    }

    else if (props.correctIdx === props.index && !props.correct) {
        return(
            <>
                <Row >
                    <Col className="x-markImage">
                        <Image src="/x-mark.png" className="x-markImage" alt="xmark" />
                    </Col>
                    <Col   className="justify-content-left">
                        <div 
                            key={props.index} 
                            id={`result-${props.index}`}
                            value={props.rad.name}
                            className="wrongResults">
                                {`${props.rad.name}`}
                        </div>
                    </Col>
                </Row>    
            </>
        );
    }
    else {
        return(
            <>
                <Row 
                    className="justify-content-center"
                    key={props.index} 
                    id={`result-${props.index}`}
                    value={props.rad.name}
                    >
                        {`${props.rad.name}`}
                </Row>       
            </>
        );
    }
}

export default Result