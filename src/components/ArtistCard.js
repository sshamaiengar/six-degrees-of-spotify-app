import { jsx } from "@emotion/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import './ArtistCard.css';

const useStyles = makeStyles({
    card: {
        // maxWidth: '20%',
        background: 'black',
        color: 'white'
    },
    menu: {
        zIndex: 9999,
    }
});

export default function ArtistCard(props) {
    /* props = {
        artist: Object
    }
    */

    const classes = useStyles();

    return (

        <Card className={classes.card + " card"}>
            <div className="cardSides">
                <div className="cardFront">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={props.artist.name}
                            height="100%"
                            image={props.artist.images.length > 1 ? props.artist.images[0].url :
                                props.artist.images.length > 0 ? props.artist.images[0].url : "https://via.placeholder.com/300/000000/000000Text="}
                            title={props.artist.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2" color='inherit'>
                                {props.artist.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </div>
                <div className="cardBack">

                </div>
            </div>
        </Card>
    );
}