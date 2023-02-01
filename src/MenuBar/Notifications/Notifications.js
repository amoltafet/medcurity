import React from 'react'
import Data from './NotifData'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const notifications = () => {
    
    return (
        <>
            {Data.map((item, index) => {
                return (
                    <Container key={index} >
                        <Row className="row">
                            <Col xs lg="2">
                            <i class={`bi bi-${item.icon} text-${item.color}`}></i>
                            </Col>
                            <Col >
                                <h6 > {item.title}</h6>   
                            </Col>
                        </Row>
                        <Row className="row">
                           <p className="float-right text-muted text-sm">{item.time}</p>
                        </Row>
                    </Container>
                )
            })}
        </>
    )
}

export default notifications
