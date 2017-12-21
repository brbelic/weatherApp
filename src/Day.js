import React from 'react';
import Temp from './Temp';

class Day extends React.Component {
    render() {
        const cityDetails = this.props.cityDetails;
        const unit = this.props.unit;

        return (
            Object.keys(cityDetails).map((day, index) => (
                <div className="day col-xs-12 col-sm-2" key={index}>
                    <div className="date col-xs-12 col-sm-12">
                        {cityDetails[day].dt_txt}
                    </div>
                    <div className="temp col-xs-12 col-sm-12">
                        <div className="description col-xs-6 col-sm-6">
                            {cityDetails[day].weather[0].description}
                        </div>
                        <div className="main-temp col-xs-6 col-sm-6">
                            <Temp
                                tempInKelvin={cityDetails[day].main.temp}
                                displayUnit={unit} />
                        </div>
                    </div>
                    <div className="temp-min col-xs-6 col-sm-6">
                        <div className="col-xs-12 col-sm-12">
                            <span>Min</span>
                        </div>
                        <div className="col-xs-12 col-sm-12">
                            <Temp
                                tempInKelvin={cityDetails[day].main.temp_min}
                                displayUnit={unit} />
                        </div>
                    </div>
                    <div className="temp-max col-xs-6 col-sm-6">
                        <div className="col-xs-12 col-sm-12">
                            <span>Max</span>
                        </div>
                        <div className="col-xs-12 col-sm-12">
                            <Temp
                                tempInKelvin={cityDetails[day].main.temp_max}
                                displayUnit={unit} />
                        </div>
                    </div>
                </div>
            ), this)
        );
    }
}

export default Day;