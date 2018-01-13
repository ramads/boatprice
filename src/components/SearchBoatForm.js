import React from 'react';

import { Row, Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class SearchBoatForm extends React.Component {

    getFormData = (e) => {
        return {
            depart: e.target.elements.depart.value,
            arrive: e.target.elements.arrive.value,
        }
    }

    isValid = (data) => {
        let isValid = true;
        return isValid;
    }


    handleOnSubmit = (e) => {
        e.preventDefault();
        const data = this.getFormData(e);

        if (e.type === 'submit') {
            if (this.isValid(data)) {
                this.props.onSubmit(data);
            }
        }
    }

    render() {
        let isLoading = this.props.isLoading;
        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup controlId="formSearchBoat">
                    <ControlLabel>From</ControlLabel>
                    <FormControl componentClass="select" name="depart">
                        {
                            BOAT_RUTES.map((rute) => (
                                <option key={rute} value={rute}>{rute}</option>
                            ))
                        }
                    </FormControl>
                </FormGroup>{' '}
                <FormGroup>
                    <ControlLabel>To</ControlLabel>
                    <FormControl componentClass="select" name="arrive" defaultValue="Gili Trawangan">
                        {
                            BOAT_RUTES.map((rute) => (
                                <option key={rute} value={rute}>{rute}</option>
                            ))
                        }
                    </FormControl>
                </FormGroup>{' '}
                <Button 
                    disabled={isLoading}
                    type="submit" 
                    bsStyle="success">
                    {isLoading ? 'Loading...' : 'Search Boot'}
                </Button>
            </Form>
        );
    }
}

const BOAT_RUTES = [
    'Bali',
    'Nusa Lembongan',
    'Lombok',
    'Gili Air',
    'Gili Trawangan',
    'Nusa Penida'
];

export default SearchBoatForm;