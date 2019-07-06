import React, {createRef} from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import './SearchBar.css';

const apiUrl = process.env.SIX_DEGREES_API_URL || "http://localhost:5000";

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div className="suggestion">
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
                {suggestion.images.length > 0 ?
                    <img className="suggestionImage" src={suggestion.images[0].url} alt={suggestion.name}/>
                    : ""}

            </div>
        </MenuItem>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const useStyles = makeStyles(theme => {
    console.log(theme);
    return {
        input: {
            color: 'white',
            borderBottom: '2px solid white',
            fontSize: '1.5em',
        },
        underline: {
            borderBottom: '2px solid white',
            '&:after': {
                // The source seems to use this but it doesn't work
                borderBottom: '2px solid white',
            },
        },
        root: {
            height: 250,
            flexGrow: 1,
        },
        container: {
            position: 'relative',
        },
        suggestionsContainerOpen: {
            position: 'absolute',
                zIndex: 1,
                marginTop: theme.spacing(1),
                left: 0,
                right: 0,
        },
        suggestion: {
            display: 'block',
                padding: 0,
        },
        suggestionsList: {
            margin: 0,
                padding: 0,
                listStyleType: 'none',
        },
        divider: {
            height: theme.spacing(2),
        },
    }
});

export default function SearchBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        single: '',
        popper: '',
    });
    const [stateSuggestions, setSuggestions] = React.useState([]);
    const artistIdElement = createRef();

    //maybe use this to cancel running requests if they're not the latest
    // may need to switch to class-based component
    // const [lastRequestId, setRequestId] = React.useState(null);

    const loadSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        // const inputLength = inputValue.length;
        let count = 0;

        // get spotify search results for this value
        const baseUrl = apiUrl + "/api/search/";
        const url = baseUrl + encodeURIComponent(value);

        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then((res) => {
                setSuggestions(res.filter((suggestion) => {
                    const keep = count < 5;
                    if (keep) {
                        count += 1;
                    }
                    return keep;
                }));
            }, (error) => {
                console.log("Error fetching search results: " + error);
            });
    };

    const handleSuggestionsFetchRequested = ({ value }) => {
        loadSuggestions(value);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
    };

    const onSuggestionSelected = (event, other) => {
        artistIdElement.current.value = other.suggestion.id;
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
        onSuggestionSelected,
    };

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-popper',
                    // label: 'Country',
                    placeholder: 'Enter Artist',
                    value: state.popper,
                    onChange: handleChange('popper'),
                    inputRef: node => {
                        setAnchorEl(node);
                    },
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                theme={{
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
                        <Paper
                            square
                            {...options.containerProps}
                            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
                        >
                            {options.children}
                        </Paper>
                    </Popper>
                )}
            />
            <input ref={artistIdElement} className="artistId" type="hidden"/>
        </div>
    );
}