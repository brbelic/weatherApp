import React from 'react';

// računanje temperaturnih jedinica http://www.rapidtables.com/convert/temperature/kelvin-to-fahrenheit.htm
const parseTime = tempInKelvin => ({
    c: Math.round(tempInKelvin - 273.15),
    k: Math.round(tempInKelvin),
    f: Math.round((tempInKelvin * (9 / 5)) - 459.67),
});

const Temp = ({ tempInKelvin, displayUnit }) => {
    if (displayUnit === 'c') {
        return (<span>{parseTime(tempInKelvin).c} °C</span>);
    } else if (displayUnit === 'f') {
        return (<span>{parseTime(tempInKelvin).f} F</span>);
    }
    return (<span>{parseTime(tempInKelvin).k} K</span>);
};

export default Temp;
