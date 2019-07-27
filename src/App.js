/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import Search from '@material-ui/icons/Search';
import Share from '@material-ui/icons/Share';
import Info from '@material-ui/icons/Info';
import {IconButton} from '@material-ui/core';
import {StylesProvider} from "@material-ui/styles";
import { jsx, css } from "@emotion/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Link } from 'react-router-dom';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

import ArtistSearch from './components/ArtistSearch';
import ArtistCard from "./components/ArtistCard";
import theme from './theme';
import './App.css';
import { copyToClipBoard} from "./components/util";


const apiUrl = process.env.SIX_DEGREES_API_URL || "http://localhost:5000";

//
function App({ match: { params}}) {
    const hasURLParams = Object.entries(params).length > 0;
    const [artist1, setArtist1] = useState({});
    const [artist2, setArtist2] = useState({});
    const [isLoading, setLoading] = useState(false);
    const disableSearch = !artist1.id || !artist2.id;
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);

    const [connectionData, setConnectionData] = useState([]);

    // clear data if new artists selected
    useEffect(() => {
        setConnectionData([]);
    }, [artist1, artist2]);

    // set artists if in parameters
    useEffect(() => {
        // if using params
        if (hasURLParams) {
            const baseUrl = apiUrl + "/api/artist/";
            fetch(baseUrl + params.artist1id, {
                method: 'GET',
                mode: 'cors',
            })
                .then(res => res.json())
                .then((res) => {
                    setArtist1(res);
                }, (error) => {
                    console.log("Error fetching artist data: " + error);
                });

            fetch(baseUrl + params.artist2id, {
                method: 'GET',
                mode: 'cors',
            })
                .then(res => res.json())
                .then((res) => {
                    setArtist2(res);
                }, (error) => {
                    console.log("Error fetching artist data: " + error);
                });
        }
    }, []);


    const getConnection = () => {
        if (Object.entries(artist1).length === 0 || Object.entries(artist2).length === 0){
            return;
        }

        const baseUrl = apiUrl + "/api/connect/";
        const url = baseUrl + artist1.id + "/" + artist2.id;
        setLoading(true);
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then((res) => {
                setConnectionData(res);
                setLoading(false);
            }, (error) => {
                console.log("Error fetching connection data: " + error);
                setLoading(false);
            });
    };

    // after artists have loaded on param route, get connection
    useEffect(() => {
        if (hasURLParams){
            getConnection();
        }
    }, [artist1, artist2]);

    const middleArtists = connectionData.slice(1,connectionData.length-1);

    const InfoLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div id="nav">
                    <IconButton href="" component={InfoLink} to={"/info"}>
                        <Info css={css`font-size:3rem; color: #1db954;`}/>
                    </IconButton>
                    {/*<Link to="/info" style={{textDecoration: "none"}}><Info css={css`font-size:3rem; color: #1db954;`}/></Link>*/}
                    <Link to="/"
                          onClick={() => {
                              setArtist1({});
                              setArtist2({});
                              setConnectionData([]);
                          }}
                          style={{textDecoration: "none"}}
                    ><h1 id="title">Six Degrees of Spotify</h1></Link>
                    <IconButton href="" disabled={connectionData.length === 0} css={css`
                        color: #1db954;
                        &:disabled {
                            color: #6d6d6d;
                        }`}
                        onClick={() => {
                            copyToClipBoard(`${window.location.href}${artist1.id}/${artist2.id}`);
                            setOpenSnackBar(true);
                        }}
                    >
                        <Share css={css`
                            font-size:3rem;
                        `}/>
                    </IconButton>
                    <Snackbar
                        open={isOpenSnackBar}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        autoHideDuration={3000}
                        onClose={() => setOpenSnackBar(false)}
                        TransitionComponent={Slide}
                        message={<span id="message-id">Connection permalink copied to clipboard!</span>}
                    />
                </div>
                {!hasURLParams && <div className="searchContainer">
                    <div className="searchBar" style={{left: '15%'}}>
                        <ArtistSearch name="artist1id" setArtist={setArtist1}/>
                        <hr style={{right:'-25%'}}/>
                    </div>

                    <div className="searchBar" style={{right: '15%'}}>
                        <ArtistSearch name="artist2id" setArtist={setArtist2}/>
                        <hr style={{left:'-25%'}}/>
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


                </div>}
                {!hasURLParams && connectionData.length === 0 && !isLoading && <div className="description">
                    <h2 style={{color: 'white', fontWeight: 300}}>Enter two artists.<br/>
                        Hit <Search style={{display:"inline-block", marginBottom: '-0.2em'}}></Search> to find a minimal set of other artists that connect them,<br/>
                        based on Spotify's related artists data.
                    </h2>

                </div>}
                {connectionData.length > 0 || isLoading ? <div className="connectionContainer">
                    <ArtistCard artist={artist1}/>
                    { middleArtists.length > 0 && !isLoading ? <div className="scrollContainer">
                        {middleArtists.map((artist, i) => <ArtistCard artist={artist} key={"card" + i}/>)}

                    </div> : ""}
                    {isLoading && <div className="loadingIndicator">
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>}
                    {connectionData.length > 1 || isLoading ? <ArtistCard artist={artist2}/> : ""}
                </div> : ""}
            </ThemeProvider>
        </StylesProvider>
    );
}

export default App;
