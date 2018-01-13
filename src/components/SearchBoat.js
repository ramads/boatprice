import React from 'react';
import Header from './Header';
import SearchBoatForm from './SearchBoatForm';
import BoatInfo from './BoatInfo';
import queryString from 'query-string';
import axios from 'axios';

import { Grid, Button, Panel, Pager, ControlLabel, Form, FormGroup, FormControl, Col, Row, Table } from 'react-bootstrap';

class SearchBoat extends React.Component {

    state = {
        isLoading: false,
        page: 0,
        isLastPage: false,
        number: 10,
        currency: '',
        queries: {...defaultQuery},
        bootResults: []
    };

    fetchBoatData = (query) => {
        return axios.get(api+query).then(function(response){
            if (response.status === 200) {
                return response.data;
            }
        });
    }

    searchBoatData = (queries) => {
        queries = {
            ...this.state.queries,
            ...queries
        }

        const queryParams = queryString.stringify(queries);
        
        this.fetchBoatData(queryParams).then((data) => {
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
        this.resetPage();
        this.setState(() => ({isLoading: true}));
        formData.offset = 0;
        this.searchBoatData(formData);
    }

    handleOrderBy = (e) => {
        this.resetPage();
        const order_by = e.target.value;
        this.searchBoatData({order_by, offset: 0});
    }

    handleOrder = (e) => {
        this.resetPage();
        const order = e.target.value;
        this.searchBoatData({order, offset: 0});
    }

    nextPage = (e) => {
        const nextPage = this.state.page + 1;
        const offset = (nextPage*this.state.number);
        this.setState(() => ({page: nextPage}));
        this.searchBoatData({offset});
    }

    prevPage = () => {
        const prevPage = this.state.page - 1;
        const offset = (prevPage*this.state.number);
        this.setState(() => ({page: prevPage}));
        this.searchBoatData({offset});
    }

    resetPage = () => {
        this.setState(() => ({page: 0}));
    }

    render() {
        return (
            <Grid>
                <Header />
                <Row>
                    <Col sm={8}>
                        <SearchBoatForm isLoading={this.state.isLoading} onSubmit={this.handleOnSubmit} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={12}>
                        {
                            (this.state.bootResults.length > 0) && (
                                <div>
                                    <Panel bsStyle="primary">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Daftar Boat untuk Rute <strong>{this.state.queries.depart} - {this.state.queries.arrive}</strong></Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <Panel>
                                                <Panel.Body>
                                                <Form inline>
                                                    <FormGroup>
                                                        <ControlLabel> Order By:</ControlLabel>{"  "}
                                                        <FormControl componentClass="select" onChange={this.handleOrderBy}>
                                                            {
                                                                listOrderBy.map((orderBy, index) => (
                                                                    <option key={index} value={orderBy}>{orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}</option>
                                                                ))
                                                            }        
                                                        </FormControl>{"  "}
        
                                                        <FormControl componentClass="select" onChange={this.handleOrder}>
                                                            <option value="ASC">Asc</option>
                                                            <option value="DESC">Desc</option>    
                                                        </FormControl>
        
                                                    </FormGroup>
                                                </Form>
                                                </Panel.Body>
                                            </Panel>

                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Boat Info</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.bootResults.map((boat, index) => (
                                                            <tr key={"tr-" + index}>
                                                                <td>{index + (this.state.page * this.state.number + 1)}</td>
                                                                <td>
                                                                    <BoatInfo key={index} {...boat} currency={this.state.currency} />
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
        
                                            <Pager>
                                                <Pager.Item previous disabled={this.state.page === 0} onClick={this.prevPage}>
                                                    &larr; Previous
                                                </Pager.Item>
                                                <Pager.Item next disabled={this.state.isLastPage} onClick={this.nextPage}>
                                                    Next &rarr;
                                                </Pager.Item>    
                                            </Pager>
                
                                        </Panel.Body>
                                    </Panel>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const api = "https://api.lrsoft.id/boat-price/v1/gets?";

const defaultQuery = {
    order_by: 'price',
    order: 'ASC'
};

const listOrderBy = [
    'price',
    'agent',
    'boat',
    'depart_time'
];

export default SearchBoat;