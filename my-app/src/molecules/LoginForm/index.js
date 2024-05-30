import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";

const initialFormData = {
    email: '',
    password: '',
};
function LoginForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navig = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('http://HOST:PORT/auth/signin', formData).then((response) => {
            if (response.status === 200) {
                setError('')
                localStorage.setItem('token', response.data.token);
                setResponse({
                    token: response.data.token,
                });
                //navig('/home');
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Invalid email or password. Please try again.');
            });
        setFormData(initialFormData);
    }, [formData, navig])


    return (
        <div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <div className='LoginLogoBlock'>
                    <div className='WelcomeBackText'>
                        <Typography fontWeight='body3' variant='title5' color='white'>Welcome Back</Typography>
                    </div>
                </div>
                <div className='InputBlock'>
                    <InputLabel title='Email'/>
                    <input
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='InputBlock'>
                    <InputLabel title='Password'/>
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>
                {error && <Typography color='white'>{error}</Typography>}
                <div className="RegButtonDiv">
                    <Button onSubmit={handleSubmit} hover='true' title='Login' textColor='white' size='medium' borderRadius='small' backgrndColor='violet'/>
                </div>
                <div className='AccExistDiv'>
                    <Typography fontWeight='body3' fontSize='title2'>Don't have an account?</Typography>
                    <Link to="/registration" className="LogInLink">
                        <Typography fontWeight='body4' fontSize='title2'>Sign up</Typography>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default memo(LoginForm);
