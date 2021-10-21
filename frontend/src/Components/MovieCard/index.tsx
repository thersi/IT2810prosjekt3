import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Typography, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { isClassExpression } from 'typescript';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './styles';


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

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
            <Container maxWidth="md" className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item className={classes.img}>
                        src={imgPath}
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify='center'>
                    <Grid item xs={12}>
                        <DialogTitle className={classes.title}>
                            Movie titel: {title}
                        </DialogTitle>
                    </Grid>
                    <Grid item xs={8}>
                        <DialogContent className={classes.genres}>
                            Genres: {genres}
                        </DialogContent>
                    </Grid>
                    <Grid item xs={4}>
                        <DialogContent className={classes.year}>
                            Year: {year}
                        </DialogContent>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContent className={classes.description}>
                            {description}
                        </DialogContent>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={handleClose} className={classes.button2}>
                        Close
                    </Button>
                </Grid>
            </Container>
        </Dialog>
        </>
    )
}