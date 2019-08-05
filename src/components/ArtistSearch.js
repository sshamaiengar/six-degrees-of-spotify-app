/** @jsx jsx */
import React from 'react';
import AsyncSelect from 'react-select/async';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {emphasize} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/Paper";
import mainTheme from '../theme';
import { ThemeProvider} from "@material-ui/styles";
import { jsx } from "@emotion/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
        fontSize: '1.5em',
        color: 'white',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: '1.0em',
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: '1.0em',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

function NoOptionsMessage(props) {
    return (
        <Typography
            // color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} style={{color:'white'}}/>;
}

function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
                fontSize: '1.5em',
                color: 'white',
                backgroundColor: '#191414',
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const loadOptions = (value) => {
    let count = 0;

    // get spotify search results for this value
    const baseUrl = "/api/search/";
    const url = baseUrl + encodeURIComponent(value);

    return fetch(url, {
        method: 'GET',
        mode: 'cors',
    })
        .then(res => res.json())
        .then((res) => {
            return res.filter((suggestion) => {
                const keep = count < 5;
                if (keep) {
                    count += 1;
                }
                return keep;
            });
        }, (error) => {
            console.log("Error fetching search results: " + error);
        });
};

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export default function ArtistSearch(props){
    const classes = useStyles();
    const theme = useTheme();
    const selectStyles = {
        input: base => ({
            ...base,
            color: '#fff',
            // '& input': {
            //     font: 'inherit',
            // },
        }),
    };

    return (
        <ThemeProvider theme={mainTheme}>
        <AsyncSelect cacheOptions loadOptions={loadOptions} getOptionLabel={option => option.name}
            getOptionValue={option => option.id} name={props.name} onChange={(value) => {props.setArtist(value);}}
            // theme={theme => ({
            //      ...theme,
            //      borderRadius: 0,
            //      colors: {
            //          ...theme.colors,
            //          primary25: 'white',
            //          primary: '#1db954',
            //      },
            // })}
            classes={classes}
            styles={selectStyles}
            TextFieldProps={{
                label: 'Artist',
                InputLabelProps: {
                 shrink: true,
                },
                placeholder: 'Search an artist',
            }}
             style={{zIndex:1000}}
            components={components}
                     noOptionsMessage={() => ('Type to load options')}
        />
        </ThemeProvider>
    );
}