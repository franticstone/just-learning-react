import React from 'react';
import { ArrowUpward } from '@material-ui/icons';
import PropTypes from 'prop-types';

export default class WeatherArrow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ArrowUpward style={{transform: `rotate( ${this.props.rotate}deg )`}} />
    }
}

WeatherArrow.propTypes = {
    rotate: PropTypes.number
}