import React from 'react';
import SearchBoatForm from './SearchBoatForm';
import BoatInfo from './BoatInfo';
import queryString from 'query-string';
import axios from 'axios';

const api = "https://api.lrsoft.id/boat-price/v1/gets?";

class SearchBoat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: '',
            queries: {},
            bootResults: []
        };
    }

    fetchBoatData = (query) => {
        console.log("query: " + query);
        return axios.get(api+query).then(function(response){
            console.log(response);
            if (response.status === 200) {
                return response.data;
            }
        });
    }

    onSubmit = (searchFormData) => {
        console.log(searchFormData);
        const query = queryString.stringify(searchFormData);

        this.fetchBoatData(query).then((data) => {
            if (data && (data.results.length > 0)) {
                this.setState(() => ({
                    currency: data.currency,
                    queries: data.queries,
                    bootResults: data.results
                }));
            } else {
                alert('Maaf. Tidak Boat ditemukan.');
            }
        });
    }

    render() {
        return (
            <div>
            <SearchBoatForm onSubmit={this.onSubmit} />
            {
                (this.state.bootResults.length > 0) && (
                    <h2>Daftar Boat dari {this.state.queries.depart} - {this.state.queries.arrive}</h2>
                )
            }
            <ol>
                {
                    this.state.bootResults.map((boat, index) => (
                        <li key={'boat-' + index}>
                            <BoatInfo key={index} {...boat} currency={this.state.currency} />
                        </li>
                    ))
                }
            </ol>
            </div>
        );
    }
}

export default SearchBoat;