import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import LogInPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ManagePosts from "../pages/ManagePosts";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/logIn" element={<LogInPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/manage-posts" element={<ManagePosts />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;
