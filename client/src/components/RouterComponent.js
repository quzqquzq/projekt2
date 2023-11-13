import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import {RegistrationPage} from "../pages/RegistrationPage";
import React from "react";
import {HomePage} from "../pages/HomePage";


export function RouterComponent(props) {

    return (
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/home" element={<HomePage/>} />
            </Routes>
    );
}

