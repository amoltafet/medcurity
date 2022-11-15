import { Row, Col, Image } from "react-bootstrap";
import './Result.css';

function Result(props) {

    if (props.type === 'mc') {
        if (props.correctIdx === props.index && props.correct) { // user selected correct answer
            return(
                <>
                    <Row>
                        <Col xs={1} md={1} className="checkmarkImage">
                            <Image src="/checkmark.png" className="checkmarkImage" alt="checkmark" />
                        </Col>
                        <Col className="">
                            <div
                                key={props.index} 
                                id={`result-${props.index}`}
                                value={props.rad.name}
                                className="correctResults">
                                    {`${props.rad.name}`}
                            </div>
                        </Col>
                    </Row>    
                </>
            );
        } else if (props.correctIdx === props.index && !props.correct) { // user selected wrong answer
            return(
                <>
                    <Row>
                        <Col xs={1} md={1} className="x-markImage">
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
        } else { // user didn't select this answer
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
    } else if (props.type === 'fill') {
        if (props.correct) { // user typed in correct answer
            return(
                <>
                    <Row>
                        <Col xs={1} md={1} className="checkmarkImage">
                            <Image src="/checkmark.png" className="checkmarkImage" alt="checkmark" />
                        </Col>
                        <Col className="">
                            <div
                                key={props.index} 
                                id={`result-${props.index}`}
                                value={props.userFillInAnswer}
                                className="correctResults">
                                    {`${props.userFillInAnswer}`}
                            </div>
                        </Col>
                    </Row>    
                </>
            );
        } else { // user typed in wrong answer
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
                                value={props.userFillInAnswer}
                                className="wrongResults">
                                    {`${props.userFillInAnswer}`}
                            </div>
                        </Col>
                    </Row>
                </>
            );
        }
    } else if (props.type === 'match') {
        if (props.correct) {
            return(
                <>
                    <Row>
                        <Col xs={1} md={1} className="checkmarkImage">
                            <Image src="/checkmark.png" className="checkmarkImage" alt="checkmark" />
                        </Col>
                        <Col className="">
                            <div
                                key={props.index} 
                                id={`result-${props.index}`}
                                className="correctResults">
                                    <p>You matched all four correctly!</p>
                            </div>
                        </Col>
                    </Row>    
                </>
            );
        } else {
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
                                className="wrongResults">
                                    <p>You created {props.numberCorrectMatches} correct matches.</p>
                            </div>
                        </Col>
                    </Row>
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