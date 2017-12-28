import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Temp from './Temp';
import InputForm from './InputForm';
import Error from './Error';

const cityID = {
    london: '2643741',
    'new york': '5128581',
    berlin: '2950159',
    tokyo: '1850147',
    'rio de janeiro': '3451190',
    'cape town': '3369157',
    oslo: '3143244',
    moscow: '524901',
    canberra: '2172517',
};

const apiPrefix = 'http://api.openweathermap.org/data/2.5/group?id=';
const apiSuffix = '&appid=2ba1461abe8d1aafbdf03d6592eb9892&callback=?';
const searchedCityApiPref = 'http://api.openweathermap.org/data/2.5/weather?q=';

class App extends Component {
    constructor() {
        super();
        this.state = {
            cityList: [],
            unit: 'c',
            searchFailed: false,
            errorStatus: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.searchCity = this.searchCity.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: apiPrefix + Object.values(cityID).join(',') + apiSuffix,
            dataType: 'jsonp',
            context: this,
        }).done(function (result) {
                this.getInitialCities(result);
        });
    }

    getInitialCities(result) {
        this.setState({
            cityList: result.list,
        })
    }

    handleClick() {
        if (this.state.unit === 'c') {
            this.setState(
                { unit: 'f' },
            );
        } else if (this.state.unit === 'f') {
            this.setState(
                { unit: 'k' },
            );
        } else {
            this.setState(
                { unit: 'c' },
            );
        }
    }

    searchCity(event) {
        if (this.inputText.value === '') {
            event.preventDefault();
            return;
        }

        $.ajax({
            url: searchedCityApiPref + this.inputText.value + apiSuffix,
            dataType: 'jsonp',
            context: this
        }).done(function (result) {
                this.props.history.push(`/${result.id}`);
                this.setState({
                    searchFailed: false,
                })
        }).fail(function (jqXHR, textStatus, errorThrown) {
                this.setState({
                    searchFailed: true,
                    errorStatus: jqXHR.status,
                })
                console.log(JSON.stringify(jqXHR), textStatus, errorThrown); //for easier understanding of an error
        });
        event.preventDefault();
    }


    render() {
        const lastUpdatedAt = new Date().toString();

        return (
            <div className="main-body container">
                    <div className="row">
                        <div className="appTitle col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2">
                            <h2>Weather App</h2>
                        </div>
                        <div className="metric-button col-xs-2 col-sm-2">
                            <button type="button" className="btn btn-info bnt-block btn-xs" onClick={this.handleClick}>
                                C/F/K
                            </button>
                        </div>
                    </div>
                    
                    {
                    this.state.cityList.map(city => (
                        <div className="city-box row" key={city.id}>
                            <div className="city-name col-xs-9 col-sm-5 col-md-5">
                                <Link to={`/${city.id}`}>{city.name.toUpperCase()}</Link>
                            </div>
                            <div className="col-xs-3 col-sm-2 col-md-2">
                                <Temp tempInKelvin={city.main.temp} displayUnit={this.state.unit} />
                            </div>
                            <div className="col-xs-6 col-sm-3 col-md-3">
                                {city.weather[0].description}
                            </div>
                            <div className="col-xs-6 col-sm-2 col-md-2">
                                {city.main.humidity}%
                            </div>
                        </div>
                        ), this)
                    }
                    <div className='error row'>
                    {
                        <Error 
                            errorStatus={this.state.errorStatus}
                            searchFailed={this.state.searchFailed} />
                    }
                    </div>
                    <div className="input row">
                        <InputForm
                            reference={(a) => { this.inputText = a; }}
                            searchCity={this.searchCity} />
                    </div>
                    <br />
                    <b>Last updated at: {lastUpdatedAt}</b>
            </div>
        );
    }
}

export default App;
