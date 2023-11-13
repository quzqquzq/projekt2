import React, {useEffect} from 'react';
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
    Typography
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {LockOutlined} from '@mui/icons-material';
import {styled} from "@mui/system";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../assets/styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {login, reset} from '../features/auth/authSlice';


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

const CustomMuiAlert = styled(MuiAlert) ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    borderColor: theme.palette.error.main,
    borderStyle: 'solid',
    borderWidth: '1px',
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

export function LoginForm(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        return (() => {
            dispatch(reset());
        })
    }, []);

    useEffect(() => {
        if (user) {
            navigate('/home');
        } else{
            navigate('/login');
        }
    } , [user, isLoading, isError, isSuccess, message])

    function onSubmit(event) {
        event.preventDefault();

        dispatch(reset());

        const data = new FormData(event.target);
        const values = Object.fromEntries(data.entries());
        const userData = {
            email: values.email,
            password: values.password
        }

        dispatch(login(userData));


    }


    return (
        <ThemeProvider theme={theme}>
            {isLoading ? <CustomLinearProgress/> : null}
            <CustomContainer component="main" maxWidth="xs">
                <CustomAvatar>
                    <LockOutlined />
                </CustomAvatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <FormControl component="form" onSubmit={onSubmit} sx={{ mt: 3, minWidth: 350 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <CustomLink to="/registration" variant="body2">
                                {"Don't have an account? Sign Up"}
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