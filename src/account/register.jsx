import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '../_services';

function Register({ history }) {
    const initialValues = {
        name: '',
        birthdate: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        birthdate: Yup.string()
            .required('Birthdate is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
            <Form className="card card-md" action="." method="get">
                <div className="card-body">
                  <h2 className="mb-5 text-center">Create new account</h2>
                  <div className="mb-3">
                        <label>Name</label>
                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                        <label>Birthdate</label>
                        <Field name="birthdate" type="date" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                        <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                        <label>Password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                    <label className="form-check">
                        <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                        <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                    </label>
                  </div>
                  <div className="form-footer">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Create new account
                        </button>
                  </div>
                </div>
                <div className="text-center text-muted">
                        Already have an account?  <Link to="login">Sign in</Link>
                    </div>
                    <br></br>
              </Form>
            )}
        </Formik>
    )
}

export { Register }; 