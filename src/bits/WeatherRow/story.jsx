import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import moment from 'moment';

import WeatherRow from './index';


storiesOf('Weather Row', module)
    .add('Example', () => (
        <div className="container">
            <WeatherRow weather={{
                time: moment(new Date()).add(3, 'days').unix(),
                icon: "rain",
                windDirection: "S",
                windBearing: 180,
                summary: "Rainy with south winds",
                temperatureLow: -2.8,
                temperatureHigh: 14.8    
            }} />
            <WeatherRow weather={{
                time: moment(new Date()).add(2, 'weeks').unix(),
                icon: "snow",
                windDirection: "SW",
                windBearing: 220,
                summary: "Snowing",
                temperatureLow: -2.8,
                temperatureHigh: 14.8    
            }} />
            <WeatherRow weather={{
                time: moment(new Date()).add(12, 'days').unix(),
                icon: "clear",
                windDirection: "NE",
                windBearing: 70,
                summary: "Clear",
                temperatureLow: -2.8,
                temperatureHigh: 14.8    
            }} />
        </div>
    ))
    .addDecorator(withInfo)