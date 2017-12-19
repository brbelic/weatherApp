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
            <div className="main-body">
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
                <div className="cityDetails">
                    <div className="detailedCityName row">
                        <h3>{this.state.city.name.toUpperCase()}</h3>
                        <span>Five days weather report.</span>
                    </div>
                    <div className="allDays row">
                        <div className="days-container col-sm-10 col-sm-offset-2">
                            <Day cityDetails={this.state.cityDetails} unit={this.state.unit}/>
                        </div>
                    </div>
                        <Location center={this.state.city.coord} />
                </div>
            </div>
        );
    }
}

export default CityDetails;
