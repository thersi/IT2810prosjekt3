import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
    root: {
        background: '#38B5F0',
        padding: 10,
    },

    id: {
        fontSize: 14,
        color: 'white',
        padding: 10,
    },

    title: {
        fontSize: 22,
        color: 'white',
        padding: 10,
        topMargin: 0,
        height: 0,
        textAlign: 'left',
    },

    description: {
        fontSize: 14,
        color: 'white',
        textAlign: 'justify',
        padding: 10,
    },
    
    img: {
        flex: 1,
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'auto',
        margin: 'auto',
    },

    genres: {
        fontSize: 14,
        color: 'white',
        padding: 10,
        textAlign: 'left',
    },

    year: {
        fontSize: 14,
        color: 'white',
        padding: 10,
        textAlign: 'left',
    },

    button1: {
        variant: 'outlined',
        color: 'primary',
    },

    button2: {
        color: 'white',
        position: 'absolute',
    },

    thumb: {
        color: 'white',
        fontSize: 'medium',
        padding: 10,
    },

    clickedThumb: {
        color: 'white',
        fontSize: 'large',
        padding: 10,
    }

}));

export default useStyles;