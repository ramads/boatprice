import React from 'react';
import Header from './Header';
import SearchBoatForm from './SearchBoatForm';
import BoatList from './BoatList';
import { fetchBoatData } from './api';

import { Grid, Col, Row} from 'react-bootstrap';

class SearchBoat extends React.Component {

    state = {
        isLoading: false,
        currency: '',
        queries: {...defaultQuery},
        bootResults: []
    };

    searchBoatData = (queries) => {
        queries = {
            ...this.state.queries,
            ...queries
        }
        
        fetchBoatData(queries).then((data) => {
            let isLastPage = false;
            if (data.results.length > 0 && data.results.length < this.state.number) {
                isLastPage = true;    
            }

            if (!(data && (data.results.length > 0)) && !isLastPage) {
                queries = {};
                alert('Maaf. Tidak Boat ditemukan.');   
            }

            this.setState(() => ({
                isLoading: false,
                isLastPage: isLastPage,
                queries: queries,
                currency: data.currency,
                bootResults: data.results
            }));

        });

    }

    handleOnSubmit = (formData) => {
        this.setState(() => ({isLoading: true}));
        this.searchBoatData(formData);
    }

    render() {
        return (
            <Grid>
                <Header />
                <Row>
                    <Col sm={8}>
                        <SearchBoatForm 
                            isLoading={this.state.isLoading} 
                            onSubmit={this.handleOnSubmit} 
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={12}>
                        {
                            (this.state.bootResults.length > 0) && (
                                <BoatList 
                                    boatList={this.state.bootResults} 
                                    currency={this.state.currency} 
                                    {...this.state.queries}
                                />
                            )
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const defaultQuery = {
    order_by: 'price',
    order: 'ASC',
    number: -1
};

export default SearchBoat;