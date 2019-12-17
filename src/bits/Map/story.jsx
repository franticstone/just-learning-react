import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import MapKit from './index';

storiesOf('Mapkit', module)
    .add('London', () => (
        <MapKit zoom={6} lat={51.509865} lon={-0.118092} />
    ))
    .addDecorator(withInfo)
