import React from 'react';
import Temp from './Temp';

class Day extends React.Component {
    render() {
        const cityDetails = this.props.cityDetails;
        const unit = this.props.unit;

        return (
            Object.keys(cityDetails).map((day, index) => (
                <div className="day row" key={index}>
                    <div className="date col-xs-3 col-sm-3 col-md-3">
                        {cityDetails[day].dt_txt}
                    </div>
                    <div className="temp col-xs-2 col-sm-2 col-md-2">
                        <Temp
                            tempInKelvin={cityDetails[day].main.temp}
                            displayUnit={unit} />
                    </div>
                    <div className="temp-min col-xs-2 col-sm-2 col-md-2">
                        <Temp
                            tempInKelvin={cityDetails[day].main.temp_min}
                            displayUnit={unit} />
                    </div>
                    <div className="temp-max col-xs-2 col-sm-2 col-md-2">
                        <Temp
                            tempInKelvin={cityDetails[day].main.temp_max}
                            displayUnit={unit} />
                    </div>
                    <div className="description col-xs-3 col-sm-3 col-md-3">
                        {cityDetails[day].weather[0].description}
                    </div>
                </div>
                ), this)
        );
    }
}

export default Day;