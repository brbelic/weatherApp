import $ from 'jquery';
import React, { Component } from 'react';
import Day from './Day';
import Location from './Location';

const apiPrefix = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const apiSuffix = '&appid=2ba1461abe8d1aafbdf03d6592eb9892';

class CityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            unit: 'c',
            city: {},
            cityDetails: {
                day1: {},
                day2: {},
                day3: {},
                day4: {},
                day5: {},
            },
        };
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        $.ajax({
            url: apiPrefix + (this.props.match.params.id) + apiSuffix,
            dataType: 'jsonp',
            context: this,
            success: function (result) {
                this.setState({
                    fetched: true,
                    city: result.city,
                    cityDetails: {
                        day1: result.list[0],
                        day2: result.list[8],
                        day3: result.list[16],
                        day4: result.list[24],
                        day5: result.list[32],
                    },
                    unit: 'c',
                });
            },
        });
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

    render() {
        if (!this.state.fetched) {
            return <div>The response it not here yet!</div>;
        }
        return (
            <div className="App">
                <div className="App-header outer">
                    <div className="inner container">
                        <div className="row">
                            <div className="appTitle col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-ms-offset-2">
                                <h2>Weather App</h2>
                            </div>
                            <button className="metric-button col-xs-2 col-sm-2 col-md-2" onClick={this.handleClick}>
                                C/F/K
                            </button>
                        </div>
                        <br />
                        <div className="cityDetails">
                            <div className="cityName row">
                                <span>{this.state.city.name.toUpperCase()}</span>
                            </div>
                            <div className="allDays container">
                                <div className="daysHeading row">
                                    <div className="date col-xs-3 col-sm-3 col-md-3">
                                        <span>Date</span>
                                    </div>
                                    <div className="temp col-xs-2 col-sm-2 col-md-2">
                                        <span>Temp</span>
                                    </div>
                                    <div className="temp-min col-xs-2 col-sm-2 col-md-2">
                                        <span>Min. temp</span>
                                    </div>
                                    <div className="temp-max col-xs-2 col-sm-2 col-md-2">
                                        <span>Max. temp</span>
                                    </div>
                                    <div className="description col-xs-3 col-sm-3 col-md-3">
                                        <span>Description</span>
                                    </div>
                                </div>
                                <Day cityDetails={this.state.cityDetails} unit={this.state.unit}/>
                            </div>
                            <div className="row">
                                <div className="col-xs-10 col-xs-offset-1 map-col">
                                    <Location center={this.state.city.coord} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CityDetails;
