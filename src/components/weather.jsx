import React from 'react';
import moment from 'moment';
import Weather from '../services/weather.js';

import { WiDaySunny, WiDayCloudy, WiCloudy, WiDayRain, WiDaySnow } from 'weather-icons-react';
import { ArrowUpward } from '@material-ui/icons';
import {
    LinearProgress
} from '@material-ui/core';

import WeatherArrow from '../bits/WeatherArrow';
import WeatherRow from '../bits/WeatherRow';
import MapKit from '../bits/Map';

export default class Weatherpage extends React.Component {

    constructor() {
        super();
        this.state = {weather: false, denied: false};
    }

    componentDidMount() {
        this.weather = new Weather();

        this.state = {weather: false, denied: false, pos: false};

        this.weather.getLocation().then(pos => {
            this.weather.getWeather().then(
                weather => {
                    this.setState({pos: this.weather.getLatLonStorage(), weather: weather});
                }
            ).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            console.log(e);
            this.setState({denied: true});
        })
    }

    loading() {
        return <LinearProgress />
    }

    page() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <MapKit zoom={8} lat={this.state.pos.latitude} lon={this.state.pos.longitude} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.weather.forecast.daily.data.map((day, day_i) => 
                            <WeatherRow weather={day} key={day_i} />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if(this.state.weather && !this.state.denied) {
            return this.page();
        } else if (!this.state.weather && !this.state.denied) {
            return this.loading();
        } else {
            return (<h1>You have denied the browser from getting your location which is needed</h1>)
        }
    }
}