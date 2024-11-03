import {useId} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const initialValus = {
                email: "",
                password: ""
}
        
const LoginForm = ({onSubmit}) => {

        const labelEmailId = useId()
        const labelPasswordId = useId()
        
        const handleSubmit = (value, action) => {
                console.log(value);
                alert(value)
                onSubmit()
                action.resetForm();
        };

        return (
                <Formik initialValues={initialValus} onSubmit={handleSubmit}>
                        <Form>
                                <div>
                                        <label htmlFor={labelEmailId}>Email</label>
                                        <Field name="email" type="email" id={labelEmailId} />
                                        <ErrorMessage name='email' component='span'/>
                                </div>
                                
                                <div>
                                        <label htmlFor={labelPasswordId}>Password</label>
                                        <Field name="password" type="password" id={labelPasswordId} />
                                        <ErrorMessage name='password' component='span' />
                                </div>

                                <button type='submit'>SignIn</button>
                        </Form>
                </Formik>
        );
}

export default LoginForm;
