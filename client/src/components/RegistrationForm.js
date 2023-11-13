import React, {useEffect, useState} from 'react';
import {
    Alert as MuiAlert,
    Avatar,
    Button,
    Container,
    FormControl,
    Grid,
    LinearProgress,
    TextField,
    Typography,
    Checkbox
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {LockOutlined} from '@mui/icons-material';
import {styled} from "@mui/system";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../assets/styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {register, reset} from '../features/auth/authSlice';


const CustomAvatar = styled(Avatar)({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
});

const CustomContainer = styled(Container)({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});


const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    },
    '&:active': {
        color: theme.palette.info.main,
    }
});

const CustomLinearProgress = styled(LinearProgress)({
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    borderRadius: '10px 10px 0 0',
    transform: 'translateY(1px)',
});

const CustomMuiAlert = styled(MuiAlert) ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    borderColor: theme.palette.error.main,
    borderStyle: 'solid',
    borderWidth: '1px',
});

export function RegistrationForm(props) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [allowBrokenAuth, setAllowBrokenAuth] = useState(false);


    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    }, []);

    useEffect(() => {
        if (isSuccess || user) {
            dispatch(reset());
            navigate('/login');
        }
    } , [user, isLoading, isError, isSuccess, message]);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState('');

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
        if (event.target.value !== password) {
            setPasswordConfirmationError(true);
            setPasswordConfirmationErrorMessage('Passwords do not match');
        }
        else {
            setPasswordConfirmationError(false);
            setPasswordConfirmationErrorMessage('');
        }
    }

    function onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const values = Object.fromEntries(data.entries());
        const userData = {
            email: values.email,
            password: values.password,
            vulnerable: allowBrokenAuth
        }
        dispatch(register(userData));
    }

    return (
        <ThemeProvider theme={theme}>
            {isLoading ? <CustomLinearProgress/> : null}
            <CustomContainer component="main" maxWidth="xs">
                <CustomAvatar>
                    <LockOutlined />
                </CustomAvatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <FormControl component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirmation"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirmation"
                                autoComplete="current-password"
                                value={passwordConfirmation}
                                error={passwordConfirmationError}
                                helperText={passwordConfirmationErrorMessage}
                                onChange={handlePasswordConfirmationChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container alignItems="center">
                        <Grid container alignItems="center"  style={{flex: 1}}>
                            <Checkbox checked={allowBrokenAuth} style={{marginBottom: "3px"}}
                                      onChange={
                                () => {
                                    setAllowBrokenAuth(!allowBrokenAuth);
                                }
                            } />
                            <Typography variant="body2" color="textSecondary">
                                Broken Auth
                            </Typography>
                        </Grid>
                        <Grid item allignItems="center">
                            <CustomLink to="/login" variant="body2">
                                <Typography variant="body2" color="textSecondary">
                                    Already have an account? Sign in
                                </Typography>
                            </CustomLink>
                        </Grid>
                    </Grid>
                    {isError ? <CustomMuiAlert severity="error" sx={{ mt: 2 }}>
                        {message}
                    </CustomMuiAlert> : null
                    }
                </FormControl>
            </CustomContainer>
        </ThemeProvider>
    )
}



