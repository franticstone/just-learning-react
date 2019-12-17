
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';


import WeatherArrow from './index';

storiesOf('Weather Arrow', module)
    .add('0 Degrees', () => (
        <WeatherArrow rotate={0} />
    ))
    .add('90 Degrees', () => (
        <WeatherArrow rotate={90} />
    ))
    .add('180 Degrees', () => (
        <WeatherArrow rotate={180} />
    ))
    .add('270 Degrees', () => (
        <WeatherArrow rotate={270} />
    ))
    .addDecorator(withInfo)