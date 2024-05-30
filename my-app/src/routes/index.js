import {Routes, Route, Link} from "react-router-dom"
import RegistrationPage from "../pages/RegistrationPage";
import LogInPage from "../pages/LoginPage";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/logIn" element={<LogInPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="*" element={<RegistrationPage/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;
