import React from 'react';
import './Input.scss';


const input = (props) => {
    let inputElement = null;
    let errormsg = null;
    let inputClasses = null;

    if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses = "form_input_invalid";
      errormsg = (<p className="form_input_error">{props.errormsg}</p>)
    }


    switch(props.elementType) {
      case('input'):
        inputElement = <input
          className={inputClasses}
          id={props.id}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          autoComplete="on"/>;
        break;
        case('select'):
        inputElement = <select
          className={inputClasses}
          id={props.id}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          autoComplete="on">
          {props.options.map(value => {
            return <option key={value} value={value}>{value}</option>
          })}
          </select>;
        break;
        case('image'):
        inputElement = <input
          className={inputClasses}
          id={props.id}
          {...props.elementConfig}
          file={props.file}
          onChange={props.changed}/>;
        break;
      case('textarea'):
        inputElement = <textarea
          className={inputClasses}
          {...props.elementConfig}
          id={props.id}
          value={props.value}
          onChange={props.changed}/>;
        break;
      default:
      inputElement = <input
        className={inputClasses}
        id={props.id}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
    }

    return (
      <div className="form_input">
        <label htmlFor={props.id}>{props.label} </label>
        {inputElement}
        {errormsg}
      </div>
  )
}

export default input;
