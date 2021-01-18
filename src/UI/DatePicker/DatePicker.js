import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import './DatePicker.scss'
const datePicker = (props) => {

    return (
        <div className="date_range_picker">
            <p>Choose date range:</p>
            <DateRangePicker
            onChange={props.onChange}
            value={props.value}
            />
        </div>
        );
    }
export default datePicker