import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '../_services';

function ForgotPassword() {
    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });

    function onSubmit({ email }, { setSubmitting }) {
        alertService.clear();
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions'))
            .catch(error => alertService.error(error))
            .finally(() => setSubmitting(false));
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
               <Form className="card card-md">
                    <div className="card-body">
                    <h2 className="mb-5 text-center">Forgot Password</h2>
                        <div className="mb-3">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-footer">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Submit
                            </button>
                            <Link to="login" className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
               </Form>
            )}
        </Formik>        
    )
}

export { ForgotPassword }; 