import * as React from 'react';
import { Typography, Avatar, Paper, Grid } from '@mui/material';
import RefreshIcon from '@mui/icons-material/VpnKey';
import makeStyles from '@mui/styles/makeStyles';

// import ForgotPassRequestForm from '@local/features/accounts/ForgotPassRequest';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        maxWidth: 425,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    nav: {
        paddingTop: theme.spacing(2),
    },
}));

export default function ForgotPassRequest() {
    const classes = useStyles();

    return (
        <Grid container alignContent='center' className={classes.root} justifyContent='center'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RefreshIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Forgot Password
                </Typography>
                <div className={classes.form}>
                    {/* <ForgotPassRequestForm
                        onSuccess={() => {
                            router.push('/login');
                        }}
                    /> */}
                </div>
            </Paper>
        </Grid>
    );
}
