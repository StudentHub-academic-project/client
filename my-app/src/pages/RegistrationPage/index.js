import './style.scss';
import RegistrationForm from "../../molecules/RegistrationForm";
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='RegistrationPageDiv auth-page'>
            <div className="logo" onClick={handleLogoClick}></div>
            <RegistrationForm />
        </div>
    );
}

export default RegistrationPage;
