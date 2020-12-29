import React from 'react';
import './Select.scss';

const select = (props) => {
    let optionElement = []
    let step = props.step
    let maxStep = props.maxStep
    for (let i=1; i<=maxStep/step; i++) {
        optionElement.push(i)
    }

    return (
        <div className="records_per_page">
            <select id="records" name="records" value={props.value} onChange={props.changed}>
            {optionElement.map(value => {
                return <option key={value} value={value*step}> {value*step}</option>
            })}
            </select>
        <label forhtml="records">Records per page</label>
        </div>
        )
}

export default select