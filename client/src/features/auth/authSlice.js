import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    userInfo: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const register = createAsyncThunk(
    'api/auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})



export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (user, thunkAPI) => {
        try {
            return await authService.getUserInfo()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            reset: (state) => {
                state.user = null;
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = "";
            }
        },
        extraReducers: {
            [register.pending]: (state) => {
                state.isLoading = true;
            },
            [register.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            },
            [register.rejected]: (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            },
            [login.pending]: (state) => {
                state.isLoading = true;
            },
            [login.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            },
            [login.rejected]: (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            },
            [logout.pending]: (state) => {
                state.isLoading = true;
            },
            [logout.fulfilled]: (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.userInfo = null;
            },
            [logout.rejected]: (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            },
            [getUserInfo.pending]: (state) => {
                state.isLoading = true;
            },
            [getUserInfo.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            },
            [getUserInfo.rejected]: (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
        }
    })


export const { reset } = authSlice.actions;
export default authSlice.reducer;