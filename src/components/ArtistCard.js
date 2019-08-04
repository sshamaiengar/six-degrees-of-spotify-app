import { jsx } from "@emotion/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, { useState } from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import './ArtistCard.css';
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
    card: {
        // maxWidth: '20%',
        background: 'black',
        color: 'white'
    },
    menu: {
        zIndex: 9999,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function ArtistCard(props) {
    /* props = {
        artist: Object
    }
    */
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const classes = useStyles();

    return (

        <Card className={classes.card + " card"} elevation={8}>
            <CardActionArea onClick={handleExpandClick}>
                <CardContent>
                    <Typography variant="h5" component="h2" color='inherit'>
                        {props.artist.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    alt={props.artist.name}
                    // height="100%"
                    image={props.artist.images.length > 1 ? props.artist.images[0].url :
                        props.artist.images.length > 0 ? props.artist.images[0].url : "https://via.placeholder.com/300/000000/000000Text="}
                    title={props.artist.name}
                />
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography component="p" color='inherit'>
                        {Number(props.artist.followers).toLocaleString(undefined)} followers
                    </Typography>
                    <Typography component="p" color='inherit'>
                        Genres: {props.artist.genres.join(", ")}
                    </Typography>
                    <div className="artistWidget">
                        <iframe src={`https://open.spotify.com/embed/artist/${props.artist.id}`} width="250" height="330"
                                frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}