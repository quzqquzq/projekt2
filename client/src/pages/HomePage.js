import React, {useEffect} from 'react';
import {Paper, Typography} from '@mui/material';
import {styled} from "@mui/system";
import {Form, useNavigate} from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Alert as MuiAlert,
    Avatar,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    LinearProgress,
    TextField,
} from '@mui/material';
import {getMessage} from "../features/people/messageSlice";


const CustomPaper = styled(Paper)({
    position: 'relative',
});

const CustomPaperTitle = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    margin: '2rem',
    marginTop: '20rem',
});

export function HomePage() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [allowSqlInjection, setAllowSqlInjection] = useState(true);
    const [messageId, setMessageId] = useState('');
    const {message} = useSelector(state => state.message);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login')
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (allowSqlInjection) {
            const str = 'vulnerable/' + messageId;
            dispatch(getMessage(str));
        }
        else {
            dispatch(getMessage(messageId));
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return ( // make form that allows user to enter message id as a text and submit it to the server to get the message
        <CustomPaper elevation={0}>
            <CustomPaperTitle elevation={0}>
                <Typography variant="h2" component="div" gutterBottom>
                    Welcome to SQL Injection Demo
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    Write number 1 or 2 or "1 UNION SELECT 1 AS id, email || ' ' || password AS message FROM users;"
                </Typography>
                <FormControl  component="form" onSubmit={handleSubmit}>
                    <TextField sx={{marginBottom: '1rem'}}
                        id="messageId"
                        label="Message ID"
                        variant="outlined"
                        value={messageId}
                        onChange={(e) => setMessageId(e.target.value)}
                    />
                    <Button type="submit" variant="contained">GET MESSAGE</Button>
                </FormControl>
                <Typography variant="h5" component="div" gutterBottom sx={{marginTop: '1rem'}}>
                    {message ? JSON.stringify(message) : null}
                </Typography>
                <FormControlLabel
                    control={<Checkbox checked={allowSqlInjection} onChange={(e) => setAllowSqlInjection(e.target.checked)} />}
                    label="Allow SQL Injection"
                />
                <Button variant="contained" onClick={handleLogout}>LOGOUT</Button>
            </CustomPaperTitle>
        </CustomPaper>
    )
}