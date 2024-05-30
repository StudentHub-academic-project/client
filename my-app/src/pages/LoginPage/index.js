import './style.scss';
import LoginForm from "../../molecules/LoginForm";
import { useNavigate } from 'react-router-dom';

function LogInPage() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='LoginPageDiv auth-page'>
            <div className="logo" onClick={handleLogoClick}></div>
            <LoginForm/>
        </div>
    );
}

export default LogInPage;
