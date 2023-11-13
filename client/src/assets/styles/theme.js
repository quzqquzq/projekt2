import {createTheme} from "@mui/material/styles";
import {blue, green, orange, red, grey} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: red[500],
        },
        info: {
            main: blue[500],
        },
        warning: {
            main: orange[500],
        },
        inactive: {
            main: grey[500],
        },
        active: {
            main: red[500],
        },
        check: {
            main: orange[500],
        },
        completed: {
            main: green[500],
        }
    }
});