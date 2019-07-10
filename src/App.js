/** @jsx jsx */
import React, {useState} from 'react';
import './App.css';
import ArtistSearch from './components/ArtistSearch';
import Search from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';
import {StylesProvider} from "@material-ui/styles";
import { jsx, css } from "@emotion/core";
import $ from 'jquery';

const apiUrl = process.env.SIX_DEGREES_API_URL || "http://localhost:5000";

function App() {
    const [artist1, setArtist1] = useState({});
    const [artist2, setArtist2] = useState({});
    const disableSearch = !artist1.id || !artist2.id;

    const [connectionData, setConnectionData] = useState([]);
    console.log(connectionData);

    const getConnection = () => {
        if (artist1.id === "" || artist2.id === ""){
            return;
        }

        const baseUrl = apiUrl + "/api/connect/";
        const url = baseUrl + artist1.id + "/" + artist2.id;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then((res) => {
                setConnectionData(res);
            }, (error) => {
                console.log("Error fetching connection data: " + error);
            });
    };

    return (
        <StylesProvider injectFirst>
            <div id="nav">
                <h1 id="title">Six Degrees of Spotify</h1>
            </div>
            <div className="searchContainer">
                <div className="searchBar" style={{left: '15%'}}>
                    <ArtistSearch name="artist1id" setArtist={setArtist1}/>
                    <hr style={{right:'-25%'}}/>
                </div>

                <IconButton href="" id='searchButton' disabled={disableSearch} onClick={getConnection } css={css`
                    position:absolute;
                    color: #fff;
                    top:15%;
                    left:50%;
                    transform: translateY(-50%) translateX(-50%);
                    &:disabled {
                        color: #6d6d6d;
                    }
                `}>
                    <Search css={css`
                        font-size: 6rem;
                        
                    `}/>
                </IconButton>

                <div className="searchBar" style={{right: '15%'}}>
                    <ArtistSearch name="artist2id" setArtist={setArtist2}/>
                    <hr style={{left:'-25%'}}/>
                </div>
            </div>
            <div className="connectionContainer">

            </div>
        </StylesProvider>
    );
}

export default App;
