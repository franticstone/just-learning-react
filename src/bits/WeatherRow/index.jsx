import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import WeatherArrow from '../WeatherArrow';
import { WiDaySunny, WiDayCloudy, WiCloudy, WiDayRain, WiDaySnow } from 'weather-icons-react';


export default class WeatherRow extends React.Component {

    constructor(props) {
        super(props);
    }

    getDayForTimestamp(ts) {
        let date = moment.unix(ts);
        let now = moment(new Date());
        if(date.format('DD/MM/YYYY') === now.format('DD/MM/YYYY')) {
            return <span><b>TODAY</b><br/><sub>{date.format('dddd Do MMM YYYY')}</sub></span>
        }
        return (<span><b>{date.format('dddd')}</b> <br/> <sub>{date.format('Do MMM YYYY')}</sub></span>);
    }

    iconForIcon(iconName) {

        if(iconName.includes('cloudy')) {
            return <WiCloudy size={56} />
        } else if(iconName.includes('clear')) {
            return <WiDaySunny size={56} />
        } else if(iconName.includes('rain')) {
            return <WiDayRain size={56} />
        } else if(iconName.includes('snow')) {
            return <WiDaySnow size={56} />
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-2">
                    {this.getDayForTimestamp(this.props.weather.time)}
                </div>
                <div className="col-sm-1">
                    {this.iconForIcon(this.props.weather.icon)}
                </div>
                <div className="col-sm-1" style={{textAlign: 'center'}}>
                    <sub><b>{this.props.weather.windDirection}</b></sub><br/>
                    <WeatherArrow rotate={this.props.weather.windBearing} /><br/>
                    <sup>{this.props.weather.windBearing}</sup>
                </div>
                <div className="col-sm-6">
                    {this.props.weather.summary}
                </div>
                <div className="col-sm-1">
                    {this.props.weather.temperatureLow.toFixed(0)}&deg; C<br/>
                    <sup>low</sup>
                </div>
                <div className="col-sm-1">
                    {this.props.weather.temperatureHigh.toFixed(0)}&deg; C<br/>
                    <sup>high</sup>
                </div>
            </div>
        );
    }
}

WeatherRow.propTypes = {
    weather:PropTypes.shape({
        time: PropTypes.unix,
        icon: PropTypes.string,
        windDirection: PropTypes.string,
        windBearing: PropTypes.number,
        summary: PropTypes.string,
        temparatureLow: PropTypes.number,
        temperatureHigh: PropTypes.number
    })
}