import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Typography, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { isClassExpression } from 'typescript';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './styles';
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export interface Attributes {
    title: string;
    description: string;
    imgPath: string;
    genres: string[];
    year: string;
}

export default function MovieDialog(props: Attributes) {
    const classes = useStyles();

    const { title, description, imgPath, genres, year, ...other } = props;

    const [open, setOpen] = React.useState(false);

    const [thumbUp, setThumbUp] = React.useState(false);

    const [thumbDown, setThumbDown] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickThumbUp = () => {
        setThumbUp(true);
        //classes.clickedThumb;
    }

    const handleClickThumbDown = () => {
        setThumbDown(true);
        //{classes.clickedThumb};
    }

    return (
        <>
        <Container maxWidth="sm">
            <Button className={classes.button1} onClick={handleClickOpen}>
                Open dialog
            </Button>
        </Container>
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <Container className={classes.root}>
                <Grid container justify="flex-end">
                    <Button onClick={handleClose} className={classes.button2}>
                        <CancelIcon/>
                    </Button>
                </Grid>
                <Grid container spacing={1} justify='center'>
                    <Grid item >
                        <img className={classes.img} src={imgPath} alt="new"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogTitle className={classes.title}>
                            Movie title: {title}
                        </DialogTitle>
                    </Grid>
                    <Grid item xs={4} >
                        <DialogContent className={classes.year}>
                            Year: {year}
                        </DialogContent>
                    </Grid>
                    <Grid item xs={8}>
                        <DialogContent className={classes.genres}>
                            Genres: {genres}
                        </DialogContent>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContent className={classes.description}>
                            {description}
                        </DialogContent>
                    </Grid>
                    <Grid item xs={12} >
                        <Button onClick={handleClickThumbUp} className={classes.thumb}>
                            <ThumbUpIcon/>
                        </Button>
                        <Button onClick={handleClickThumbDown} className={classes.thumb}>
                            <ThumbDownIcon/>
                        </Button>
                    </Grid>
                    
                </Grid>
            </Container>
        </Dialog>
        </>
    )
}