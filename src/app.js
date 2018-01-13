import React from 'react';
import ReactDOM from 'react-dom';
import SearchBoat from './components/SearchBoat';

const app = (
    <SearchBoat />
);

var appRoot = document.getElementById('app'); 
ReactDOM.render(app, appRoot);