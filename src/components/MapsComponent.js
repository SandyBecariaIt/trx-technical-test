import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, TrafficLayer } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '400px'
  };

function MapsComponemt (props) {
  const { locationsProps = [] } = props;
  
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState({
	lat: 19.6509696,
	lng: -99.1133696
  });
  const [map, setMap] = React.useState(null)

  useEffect(() => {
	if (locationsProps.length > 0) {
	  setLocations(locationsProps)
	  setCenter(locationsProps[0].position)
	}
  }, [locationsProps])

  const { isLoaded } = useJsApiLoader({
	id: 'google-map-script',
	googleMapsApiKey: process.env.REACT_API_KEY_MAPS
  })

  const onLoadMarker = (marker) => {
  };

  const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
	
		setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
	setMap(null)
  }, [])

  return isLoaded ? (
	<GoogleMap
	  mapContainerStyle={containerStyle}
	  center={center}
	  zoom={4}
	  onLoad={onLoad}
	  onUnmount={onUnmount}
	  position={center}
	>
	  {
		locationsProps.map(item => {
		  return (
			<MarkerF
			  key={item.id}
			  onLoad={onLoadMarker}
			  position={item.position}
			  title={`${item.title}`}
			/>
		  );
		})
	  }
	</GoogleMap>
) : <></>
}

export default MapsComponemt;