
import React, { useState } from 'react';
import './authForm.scss';
import { INPUT_TYPES } from '../input/input';
import Input from '../input/input';
import Form from '../form/form';

export default function AuthForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', login, 'Password:', password);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div className="authForm">
            <Form handleSubmit={handleSubmit}>
                <Input type={INPUT_TYPES.TEXT} placeholder={'Your login'} name="login" value={login} onChangeHandler={onInputChange} />
                <Input type={INPUT_TYPES.PASSWORD} placeholder={'Your password'} name="password" value={password} onChangeHandler={onInputChange} />
                <Input type={INPUT_TYPES.SUBMIT} value="Login" />
            </Form>
        </div>
    );
}


