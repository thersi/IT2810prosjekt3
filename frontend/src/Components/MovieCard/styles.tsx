import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
    root: {
        background: 'dark',
        padding: 0
    },
    title: {
        fontSize: 22,
        padding: 10,
        topMargin: 0,
        height: 0,
        textAlign: 'left'
    },
    description: {
        fontSize: 14,
        textAlign: 'justify',
        padding: 10,
    },
    
    img: {
        magin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

    genres: {
        fontSize: 14,
        padding: 10,
        textAlign: 'left',
    },
    year: {
        fontSize: 14,
        padding: 10,
        textAlign: 'left',
    },
    button1: {
        variant: 'outlined',
        color: 'primary'
    },

    button2: {
        variant: 'outlined',
        color: 'secondary',
    }
}));

export default useStyles;