import { useState } from "react";
import { TextField, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import interceptToken, { startAutoRefresh } from '../../services/interceptToken';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setUsernameError(false);
        setPasswordError(false);
        setLoading(true);

        try {
            const response = await interceptToken.post('/Auth/Login', { username, password });
    
            const data = response.data;
            const { token, refreshToken } = data;
            localStorage.setItem('Bearer ', token);
            localStorage.setItem('RefreshToken', refreshToken);
    
            startAutoRefresh(refreshToken);

            navigate('/Home');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Box className="login-box">
                <div className="login-header">
                    <Typography
                        className="login-title"
                        variant="h5"
                    >
                        Visualization Vehicle
                    </Typography>
                    {error && <Typography sx={{ pt: 2 }} color="error">{error}</Typography>}
                </div>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={passwordError}
                    />
                    <div className="login-button">
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            loading={loading}
                            onClick={handleLogin}
                            type="submit"
                            loadingPosition="start"
                        >
                            <span>{loading ? 'Logging in...' : 'Login'}</span>
                        </LoadingButton>
                    </div>
                </form>
            </Box>
        </div>
    );
}

export default Login;