import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const Location = ({ google, center }) => (
    <Map google={google} zoom={5} initialCenter={{
            lat: center.lat,
            lng: center.lon
          }}>

        <Marker
            name={'Current location'} />
    </Map>
);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBSA4geWFnLuKlH3vIS5BJW34_X3jN5MVg',
})(Location);
