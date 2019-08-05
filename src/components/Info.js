import React, {useEffect, useState} from 'react';

import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import {Link} from "react-router-dom";
import {StylesProvider} from "@material-ui/styles";
import { css } from '@emotion/core';

import theme from "../theme";
import '../App.css';

export default function Info(props) {
    const [stats, setStats] = useState({});
    useEffect(() => {
        const url = "/api/stats";
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then((res) => {
                setStats(res)
            }, (error) => {
                console.log("Error fetching stats: " + error);
            });
    }, []);

    const outputConnectionLink = (connection) => {
        return (
            <Link to={"/" + connection.url}>{connection.artists[0].name} - {connection.artists[connection.artists.length - 1].name}</Link>
        );
    };

    /* intersperse: Return an array with the separator interspersed between
     * each element of the input array.
     */
    const intersperse = (arr, sep) => {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    };

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
                    <p> Inspired by the idea of <a href="https://en.wikipedia.org/wiki/of_separation" target="_blank" rel="noopener noreferrer">six degrees of separation</a>,
                        this app attempts to find a shortest chain of artists connecting any two artists on Spotify.
                        Two artists <i>A</i> and <i>B</i> are considered connected if <i>A</i> is one of <i>B</i>'s related artists, or <i>B</i> is one of <i>A</i>'s related artists.
                        Related artists are shown under <strong>Fans Also Like</strong> in the Spotify Apps.
                        <br/>
                        For example, Ed Sheeran is connected to Maroon 5 through DNCE, since DNCE is in Ed Sheeran's related artists and in Maroon 5's related artists.
                    </p>
                    <p>This is made possible by the <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify Web API</a>.</p>
                    <p>Developed by <a href="https://github.com/sshamaiengar" target="_blank" rel="noopener noreferrer">Stephen Shamaiengar.</a></p>
                    <br/>
                    {Object.entries(stats).length > 0 && <><h2>Statistics</h2>
                    <hr/>
                    <ul style={{listStyle: 'none', paddingLeft: 0}}>
                        <li><h3><strong>Connections searched:</strong> {stats.connections_searched}</h3></li>
                        <li><h3><strong>Max degrees of separation:</strong> {stats.max_degrees_path.degrees} (
                            {outputConnectionLink(stats.max_degrees_path)}
                            )</h3></li>
                        <li><h3><strong>Average degrees of separation:</strong> {stats.mean_degrees.toFixed(1)}</h3></li>
                        <li><h3><strong>Most searched artists: </strong>
                            {stats.top_artists.map((artist, i) => (artist.name + (i < stats.top_artists.length - 1 ? ", " : "")) )}
                        </h3></li>
                        <li><h3><strong>Most searched connections: </strong>
                            {intersperse(stats.top_connections.map((connection) => (outputConnectionLink(connection))), ", ")}
                        </h3></li>
                        <li><h3><strong>Empty connections found: </strong>
                            {stats.nonexistent_connections.length ?
                                intersperse(stats.nonexistent_connections.map((connection) => (outputConnectionLink(connection))), ", ")
                            : "None"}
                        </h3></li>
                    </ul></>}
                </div>
            </ThemeProvider>
        </StylesProvider>
    );
}