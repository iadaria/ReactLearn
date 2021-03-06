import React, { useContext } from 'react';
import './login-form.sass';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { Button, CircularProgress, Typography, Divider } from '@material-ui/core';

import { RootStoreContext } from '../../../app/stores/rootStore';
import { IUserFormValues } from '../../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import SocialLogin from '../SocialLogin';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login, fbLogin, loading } = rootStore.userStore;

    return (
        <div className="login-form">
            <FinalForm
                onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                    [FORM_ERROR]: error //from axios and store inside const - FORM_ERROR
                }))}
                validate={validate}
                render={({ 
                    handleSubmit, 
                    submitting, 
                    form, 
                    submitError, 
                    invalid, 
                    pristine, 
                    dirtySinceLastSubmit 
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="on" >
                        <Typography className="title" component="h2">
                            Login to Reactivities
                        </Typography>
                        <Field
                            name='email'
                            component={TextInput}
                            placeholder='Email'
                            label="Email"
                        />

                        <Field
                            name='password'
                            component={TextInput}
                            placeholder='Password'
                            type='password'
                            label="Password"
                            autoComplete="on"
                        />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage error={submitError} text='Invlid usernaem or password' />
                        )}
                        <Button
                            className="btn-login"
                            type="submit"
                            disabled={(invalid && !dirtySinceLastSubmit) || submitting || pristine}
                            variant="contained"
                            fullWidth
                        >
                            {submitting && <CircularProgress size='1.3rem' />}
                            {!submitting && 'Login'}
                        </Button>

                        <Divider />
                        
                        <SocialLogin loading={loading} fbCallback={fbLogin}/>
                        {/* <pre>{JSON.stringify(form.getState())}</pre> */}
                        {/* Cleare to read */}
                        {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
                    </form>
                )}
            />
        </div>
    );
};

export default observer(LoginForm);
