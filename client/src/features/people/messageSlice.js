import {messageService} from "./messageService";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getMessages = createAsyncThunk(
    'message/getMessages',
    async (data, thunkAPI) => {
        try {
            return await messageService.getMessages(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMessage = createAsyncThunk(
    'message/getMessage',
    async (id, thunkAPI) => {
        try {
            return await messageService.getMessage(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createMessage = createAsyncThunk(
    'message/createMessage',
    async (data, thunkAPI) => {
        try {
            return await messageService.createMessage(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateMessage = createAsyncThunk(
    'message/updateMessage',
    async (data, thunkAPI) => {
        try {
            return await messageService.updateMessage(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteMessage = createAsyncThunk(
    'message/deleteMessage',
    async (id, thunkAPI) => {
        try {
            return await messageService.deleteMessage(id);
        }
        catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const getMessagesByPostId = createAsyncThunk(
    'message/getMessagesByPostId',
    async (id, thunkAPI) => {
        try {
            return await messageService.getMessagesByPostId(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        message: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getMessages.pending]: (state, action) => {
            state.loading = true;
        },
        [getMessages.fulfilled]: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        [getMessages.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [getMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [getMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [createMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [updateMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [updateMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [deleteMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMessagesByPostId.pending]: (state, action) => {
            state.loading = true;
        },
        [getMessagesByPostId.fulfilled]: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        [getMessagesByPostId.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});

export default messageSlice.reducer;