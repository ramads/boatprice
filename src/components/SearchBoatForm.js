import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
                <button>Search Boot</button>
            </form>
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