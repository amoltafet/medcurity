import { Row, Col, Image } from "react-bootstrap";
import './Result.css';

function Result(props) {

    if (props.correctIdx === props.index && props.correct) {
        return(
            <>  
                <Row> 
                    <Col xs={1} md={1} className="checkmarkImage">
                        <Image src="/checkmark.png" className="checkmarkImage"  alt="checkmark" />
                    </Col >
                    <Col className="">
                        <div
                            key={props.index} 
                            id={`result-${props.index}`}
                            value={props.rad.name}
                            className="correctResults ">
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
                <Row>
                    <Col xs={1} md={1} className=" x-markImage">
                        <Image src="/x-mark.png" className="x-markImage" alt="xmark" />
                    </Col>
                    <Col xs={10} md={10} className="">
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
                    className="justify-content-left"
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