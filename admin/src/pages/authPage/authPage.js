
import React, { useState } from 'react';

import { INPUT_TYPES } from '../../components/input/input';
import Input from '../../components/input/input';
import Form from '../../components/form/form';
import { toast } from 'react-toastify';
import { myStore } from '../../store/store';

import 'react-toastify/dist/ReactToastify.css';
import './authPage.scss';
import Button from '../../components/button/button';

const LETTER_AND_DIGITS_REGEXP = /[^a-zA-Z0-9]/g;
const LOGIN = 'login';
const PASSWORD = 'password';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const setLoading = myStore(state => state.setLoading);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!(login.length >= 3 && login.length <= 100 && /^[a-zA-Z0-9]+$/.test(login) && password.length >= 3 && password.length <= 100 && /^[a-zA-Z0-9]+$/.test(password))) {
            toast.warn('Your login or password is not correct');
            return;
        }
        fetchData();
    };

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!data.ok) {
                toast.warn(data.message);

                return;
            }
            console.log('Successfully logged in');
            window.location.href = '/';
        } catch (error) {
            toast.error('An error occurred while logging in.');
        } finally {
            setLoading(false);
        }
    }

    function onInputChange(e) {
        const { name, value } = e.target;
        if (name === LOGIN) {
            setLogin(value.replace(LETTER_AND_DIGITS_REGEXP, ''));
        } else if (name === PASSWORD) {
            setPassword(value.replace(LETTER_AND_DIGITS_REGEXP, ''));
        }
    };

    return (
        <div className="authForm">
            <div className='formWrapper'>
                <Form handleSubmit={handleSubmit}>
                    <Input type={INPUT_TYPES.TEXT} placeholder={'Your login'} name={LOGIN} value={login} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.PASSWORD} placeholder={'Your password'} name={PASSWORD} value={password} onChangeHandler={onInputChange} />
                    <Button buttonText={'Login'} />
                </Form>
            </div>

        </div>
    );
}


