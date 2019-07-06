import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Search from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';
import theme from './theme.js';
import { MuiThemeProvider} from "@material-ui/core/styles";

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <div id="nav">
          <h1 id="title">Six Degrees of Spotify</h1>
        </div>
        <div className="searchContainer" style={{left:'15%'}}>
            <SearchBar/>
            <MoreHoriz color="primary" style={{fontSize: '3em', display:'block', position:"absolute", right:'-25%', top:'0%', transform: 'scale(2.0,2.0)'}}/>
        </div>

          <IconButton href="" id='searchButton' style={{display:'block', position:"absolute", left:'50%', top:'40%', transform:'translateY(-50%) translateX(-50%)'}}>
              <Search style={{fontSize: '3em', color: theme.palette.primary.light}}/>
          </IconButton>

        <div className="searchContainer" style={{right:'15%'}}>
              <SearchBar/>
              <MoreHoriz color="primary" style={{fontSize: '3em', display:'block', position:"absolute", left:'-25%', top:'0%', transform: 'scale(2.0,2.0)'}}/>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
