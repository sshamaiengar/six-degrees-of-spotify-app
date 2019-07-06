import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        useNextVariants:
            true,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ]
    },
    palette: {
        primary: {
            light: '#fff',
            main: '#1db954',
            dark: '#fff',
            contrastText: '#fff',
        },
        // primary: {
        //     main: '#1db954',
        // },
        background: {
            paper: "#191414",
            default: "#191414",
        },
        text: {
            primary: '#fff',
            secondary: '#fff',

        }
    },
});
export default theme;