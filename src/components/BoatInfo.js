import React from 'react';

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
        console
        return (
            <div>
                <p>
                    <strong>{this.props.agent}</strong> - {this.props.boat} ({this.props.currency + ' ' + this.convertCurrency(this.props.price)})
                </p>
                <p>{this.props.fetch_date}</p>
            </div>
        );
    }
}

export default BoatInfo;