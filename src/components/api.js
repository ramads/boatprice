import queryString from 'query-string';
import axios from 'axios';

export const fetchBoatData = (queries) => {
    const queryParams = queryString.stringify(queries);
    const api = "https://api.lrsoft.id/boat-price/v1/gets?";

    return axios.get(api+queryParams).then(function(response){
        if (response.status === 200) {
            return response.data;
        }
    });
}