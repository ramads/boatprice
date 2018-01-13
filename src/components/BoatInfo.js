import React from 'react';
import { Row, Col, Image, Label } from 'react-bootstrap';

class BoatInfo extends React.Component {

    convertCurrency = (currency) => {
        const rev = parseInt(currency, 10).toString().split('').reverse().join('');
        let rev2 = '';
        for(var i = 0; i < rev.length; i++){
            rev2 += rev[i];
            if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
                rev2 += '.';
            }
        }
        return rev2.split('').reverse().join('');
    } 

    render() {
        return (
            <Row>
                <Col sm={2}>
                    <Image className="pull-left" src={this.props._boat_photo} thumbnail responsive />
                </Col>
                <Col sm={10} style={{paddingLeft: 0}}>
                    <Col sm={6} style={{paddingLeft: 0}}>
                        <strong>{this.props.boat}</strong>
                        <br/>
                        Agent: {this.props.agent}
                        <br/>
                        Depart Time: {this.props.depart_time}
                        <br/>
                        Arrive Time: {this.props.arrive_time}
                        <br/>
                        Website: <a href={this.props._agent_site}>{this.props._agent_site}</a>
                    </Col>
                    <Col sm={6}>
                        <h3 style={{marginTop: 0}}>
                            <Label bsStyle="success" className="pull-right">
                                {this.props.currency + ' ' + this.convertCurrency(this.props.price)}
                            </Label>
                        </h3>
                    </Col>
                </Col>
                
            </Row>
        );
    }
}

export default BoatInfo;