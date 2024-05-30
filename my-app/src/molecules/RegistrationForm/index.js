import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";

const initialFormData = {
    username: '',
    email: '',
    password: '',
    password_repeat: '',
    fullname: '',
};

function RegistrationForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [unfilledError, setUnfilledError] = useState(null);
    // const navigate = useNavigate();

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
        if (!formData.username || !formData.fullname || !formData.password) {
            setUnfilledError(true);
            return;
        }

        axios.post('http://localhost:9110/auth/signup', formData).then((response) => {
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                setResponse({
                    token: response.data.token,
                });
                // navigate('/home');
            }
        })
            .catch((error) => {
                setResponse(null);
                setError(error.message);
            });
        setFormData(initialFormData);
    }, [formData])

    return (
        <div className='FormBlock FormDiv'>
            <div className='RegLogoBlock'>
                {/*<Link to="/home" className="GoBackLink">*/}
                {/*    /!*<img src={LogoMain} className='RegLogoImg'/>*!/*/}
                {/*</Link>*/}
                <div className='AccCreate'>
                    <Typography fontWeight='body3' variant='title5' color='white'>Create your account</Typography>
                </div>
            </div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <div className='InputsDiv'>
                    <div className='InputBlock'>
                        <InputLabel title='Username'/>
                        <input
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='InputBlock'>
                        <InputLabel title='Fullname'/>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
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
                        />
                    </div>
                    <div className='InputBlock'>
                        <InputLabel title='Repeat Password'/>
                        <input
                            type="password"
                            placeholder="Repeat password"
                            name="password_repeat"
                            value={formData.password_repeat}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                    <Typography color='white'>
                        {unfilledError ? 'Please fill in all fields' : ''}
                    </Typography>
                <div className="RegButtonDiv">
                    <Button onSubmit={handleSubmit} title='Register Account' textColor='white' hover='true' size='medium' borderRadius='small' backgrndColor='violet'/>
                </div>
                <div className='AccExistDiv'>
                    <Typography fontWeight='body3' fontSize='title2'>Already have an account?</Typography>
                    <Link to="/logIn" className="LogInLink">
                        <Typography fontWeight='body4' fontSize='title2'>Sign in</Typography>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default memo(RegistrationForm);
