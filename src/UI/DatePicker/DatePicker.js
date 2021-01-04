import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import './DatePicker.scss'
const datePicker = (props) => {

    return (
        <div className="date_range_picker">
            <DateRangePicker
            onChange={props.onChange}
            value={props.value}
            />
            <p>Choose date range</p>
        </div>
        );
    }
export default datePicker