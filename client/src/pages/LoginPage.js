

import React from 'react';
import { LoginForm} from "../components/LoginForm";
import {Paper} from '@mui/material';
import {styled} from "@mui/system";

const CustomPaper = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '420px',
    height: '100%',
    maxHeight: '600px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
});



export function LoginPage(props) {
    return (
        <CustomPaper>
            <LoginForm />
        </CustomPaper>
    )
}