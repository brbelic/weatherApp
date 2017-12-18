import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const Location = ({ google, center }) => (
	<div className="map-container row">
		<div className="map-col col-xs-12">
		    <Map google={google} zoom={7} initialCenter={{
		            lat: center.lat,
		            lng: center.lon
		          }}>

		        <Marker
		            name={'Current location'} />
		    </Map>
		</div>
	</div>
);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBSA4geWFnLuKlH3vIS5BJW34_X3jN5MVg',
})(Location);
