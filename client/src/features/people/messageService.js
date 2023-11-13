import axios from "axios";

export const getMessage = async (id) => {
    const response = await axios.get('/api/messages/' + id);
    return response.data.result;
}

export const messageService = {
    getMessage,
}