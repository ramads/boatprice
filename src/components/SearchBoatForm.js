import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BOAT_RUTES = [
    'Bali',
    'Nusa Lembongan',
    'Lombok',
    'Gili Air',
    'Gili Trawangan',
    'Nusa Penida'
];

class SearchBoatForm extends React.Component {

    state = {
        departureDate: moment(),
        returnDate: moment()
    }

    handleDepartureDateChange = (date) => {
        this.setState({
            departureDate: date
        });
    }

    handleReturnDateChange = (date) => {
        this.setState({
            returnDate: date
        });
    }

    getFormData = (e) => {
        return {
            depart: e.target.elements.depart.value,
            arrive: e.target.elements.arrive.value,
            fetch_date: this.state.departureDate.format('YYYY-MM-DD'),
            returnDate: this.state.returnDate.format('YYYY-MM-DD')
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
        return (
            <form onSubmit={this.handleOnSubmit}>
                <label>From</label>
                <select name="depart">
                    {
                        BOAT_RUTES.map((rute) => (
                            <option value={rute}>{rute}</option>
                        ))
                    }
                </select>

                <label>To</label>
                <select name="arrive" defaultValue="Gili Trawangan">
                    {
                        BOAT_RUTES.map((rute) => (
                            <option value={rute}>{rute}</option>
                        ))
                    }
                </select>

                <br/>
                <br/>
                <label>Departure</label>
                <DatePicker
                    selected={this.state.departureDate}
                    onChange={this.handleDepartureDateChange}
                />

                <label>Return</label>
                <DatePicker
                    selected={this.state.returnDate}
                    onChange={this.handleReturnDateChange}
                />

                <br/>
                <br/>
                <button>Search Boot</button>
            </form>
        );
    }
}


export default SearchBoatForm;