import React from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';

mapboxgl.accessToken = "pk.eyJ1IjoicGF1bGdhcmRpbmVyIiwiYSI6ImNrNDhsZDRrNTA4dnozbHByOXh1dXVpMjEifQ.Wl4xLO0jvesQj_ux5uYKhw";

export default class MapKit extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/paulgardiner/ck48lylle26f51cl9yuw1th3v',
            center: [this.props.lon, this.props.lat],
            zoom: this.props.zoom
        });

        var el = document.createElement('div');
        el.className = 'marker';
        el.style.cssText = "width:20px; height:20px; border-radius:20px; background-color:red"
        new mapboxgl.Marker(el)
            .setLngLat({lng:this.props.lon, lat:this.props.lat})
            .addTo(map);
    }

    render() {
        return (
        <div>
        <div style={{position: 'relative', width:'100%', height:'300px'}} ref={el => this.mapContainer = el} className="mapContainer" />
        </div>
        )
    }
}

MapKit.propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number
}