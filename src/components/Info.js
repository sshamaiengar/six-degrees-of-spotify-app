import React from 'react';

import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import {Link} from "react-router-dom";
import {StylesProvider} from "@material-ui/styles";
import { css } from '@emotion/core';

import theme from "../theme";
import '../App.css';


export default function Info(props) {
    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div id="nav" style={{justifyContent: "center"}}>
                    <Link to="/"
                          // onClick={() => {
                          //     setArtist1({});
                          //     setArtist2({});
                          //     setConnectionData([]);
                          // }}
                          style={{textDecoration: "none"}}
                    ><h1 id="title">Six Degrees of Spotify</h1></Link>
                </div>
                <div id="infoContent">
                    <h2>About</h2>
                    <hr/>
                    <p> Inspired by the idea of <a href="https://en.wikipedia.org/wiki/Six_degrees_of_separation" target="_blank" rel="noopener noreferrer">six degrees of separation</a>,
                        this app attempts to find a shortest chain of artists connecting any two artists on Spotify.
                        Two artists <i>A</i> and <i>B</i> are considered connected if <i>A</i> is one of <i>B</i>'s related artists, or <i>B</i> is one of <i>A</i>'s related artists.
                        Related artists are shown under <strong>Fans Also Like</strong> in the Spotify Apps.
                        <br/>
                        For example, Ed Sheeran is connected to Maroon 5 through DNCE, since DNCE is in Ed Sheeran's related artists and in Maroon 5's related artists.
                    </p>
                    <p>This is made possible by the <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify Web API</a>.</p>
                    <p>Developed by <a href="https://github.com/sshamaiengar" target="_blank" rel="noopener noreferrer">Stephen Shamaiengar.</a></p>
                    <br/>
                    <h2>Statistics</h2>
                    <hr/>
                    <ul style={{listStyle: 'none', paddingLeft: 0}}>
                        <li><h3>Number of connections searched: </h3></li>
                        <li><h3>Longest connection: </h3></li>
                        <li><h3>Most searched artist: </h3></li>
                        <li><h3>Most searched connection: </h3></li>
                        <li><h3>Empty connections found: </h3></li>
                    </ul>
                </div>
            </ThemeProvider>
        </StylesProvider>
    );
}