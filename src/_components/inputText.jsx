import React from 'react'
import { Field, ErrorMessage } from 'formik';

function InputText(props) {
    return (
        <>
            <label>{props.label}</label>
            <Field name={props.name}  placeholder={props.placeholder} type="text" className={'form-control' + (props.error && props.touched ? ' is-invalid' : '')} />
            <ErrorMessage name={props.errorname} component="div" className="invalid-feedback" />
        </>  
    );   
}
export { InputText }; 